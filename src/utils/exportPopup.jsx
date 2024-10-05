import React, { useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { utils, writeFile } from 'xlsx'; // Correct import for xlsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faTimes } from '@fortawesome/free-solid-svg-icons';

const ExportPopup = ({ isOpen, onClose, data, elementId }) => {
    const [exportFormat, setExportFormat] = useState('pdf');

    const handleExport = () => {
        if (exportFormat === 'pdf') {
            exportToPDF();
        } else if (exportFormat === 'excel') {
            exportToExcel();
        }
    };

    const exportToPDF = async () => {
        const table = document.getElementById(elementId);
        if (!table) {
            console.error('Element not found');
            return;
        }
        try {
            const canvas = await html2canvas(table);
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            pdf.addImage(imgData, 'PNG', 0, 0);
            pdf.save('table.pdf');
        } catch (error) {
            console.error('Error generating PDF', error);
        }
    };

    const exportToExcel = () => {
        const ws = utils.json_to_sheet(data);
        const wb = utils.book_new();
        utils.book_append_sheet(wb, ws, 'Sheet1');
        writeFile(wb, 'table.xlsx');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg relative w-80">
                <button onClick={onClose} className="absolute top-2 right-2 text-gray-500">
                    <FontAwesomeIcon icon={faTimes} />
                </button>
                <h2 className="text-lg font-semibold mb-4">Export Table</h2>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Select Format:</label>
                    <select
                        value={exportFormat}
                        onChange={(e) => setExportFormat(e.target.value)}
                        className="border border-gray-300 rounded-lg p-2 w-full"
                    >
                        <option value="pdf">PDF</option>
                        <option value="excel">Excel</option>
                    </select>
                </div>
                <button
                    onClick={handleExport}
                    className="w-full bg-blue-500 text-white p-2 rounded-lg"
                >
                    Export
                </button>
            </div>
        </div>
    );
};

export default ExportPopup;

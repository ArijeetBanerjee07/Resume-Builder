import { Palette, Check } from "lucide-react";
import React, { useState } from "react";

export default function ColorPicker({ onChange, selectedColor }) {
    const colors = [
        { name: 'Blue', color: '#3B82F6' },
        { name: 'Green', color: '#22C55D' },
        { name: 'Red', color: '#EF4444' },
        { name: 'Yellow', color: '#FBBF24' },
        { name: 'Purple', color: '#9333EA' },
        { name: 'Pink', color: '#F43F5E' },
        { name: 'Orange', color: '#F97316' },
        { name: 'Teal', color: '#14B8A6' },
        { name: 'Cyan', color: '#06B6D4' },
        { name: 'Indigo', color: '#6366F1' },
        { name: 'Gray', color: '#64748B' },
        { name: 'Black', color: '#000000' },
    ]
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="relative">
            <button onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-1 text-sm text-purple-600 bg-gradient-to-br from-purple-50 to-purple-100 ring-purple-300 hover:ring transition-all px-3 py-2 rounded-lg">
                <Palette size={16} /><span className="max-sm:hidden">Accent</span>
            </button>
            {isOpen && (
                <div className="grid grid-cols-4 w-60 gap-2 absolute top-full left-0 right-0 p-3 mt-2 z-10 bg-white rounded-md border border-gray-200 shadow-sm">
                    {colors.map((color) => (
                        <div key={color.color} className="relative cursor-pointer group flex flex-col items-center" onClick={() => { onChange(color.color); setIsOpen(false); }}>
                            <div className="w-12 h-12 rounded-full border-2 border-transparent group-hover:border-black/25 transition-colors flex items-center justify-center" style={{ backgroundColor: color.color }}>
                                {selectedColor === color.color && (
                                    <Check className="size-4 text-white" />
                                )}
                            </div>
                            <p className="text-xs text-center mt-1 text-gray-600">{color.name}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
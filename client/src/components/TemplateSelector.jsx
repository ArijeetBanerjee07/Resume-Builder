import React, { useState } from 'react'
import { Check, Layout } from 'lucide-react'

export default function TemplateSelector({ selectedTemplate, onChange }) {
    const [isOpen, setIsOpen] = useState(false);

    const templates = [
        {
            id: "classic",
            name: "Classic",
            preview: "A clean, traditional resume format with clear sections and professional typography"
        },
        {
            id: "modern",
            name: "Modern",
            preview: "Bold, sleek, and built for today’s tech-driven resumes."
        },
        {
            id: "minimal",
            name: "Minimal",
            preview: "Clean design that puts your skills first, nothing extra."
        },
        {
            id: "minimal-image",
            name: "Minimal Image",
            preview: "A minimal layout with a subtle visual touch for personal branding."
        },
    ]
    return (
        <div className='relative'>
            <button onClick={() => setIsOpen(!isOpen)} className='flex items-center gap-1 text-sm text-blue-600 bg-gradient-to-br from-blue-50 to-blue-100 ring-blue-300 hover:ring transition-all px-3 py-2 rounded-lg'>
                <Layout size={14} />
                <span>Template</span>
            </button>
            {isOpen && (
                <div className='absolute top-full w-xs p-3 mt-2 space-y-3 z-10 bg-white rounded-md border border-gray-200 shadow-sm'>
                    {templates.map((template) => (
                        <div key={template.id} onClick={() => { onChange(template.id); setIsOpen(false) }} className={`relative p-3 border rounded-md cursor-pointer transition-all ${selectedTemplate === template.id ? 'bg-blue-50 border-blue-300' : 'border-gray-200 hover:bg-gray-50 hover:border-gray-300'}`}>
                            {selectedTemplate === template.id && (
                                <div className='absolute top-2 right-2'>
                                    <div className='size-5 bg-blue-400 rounded-full flex items-center justify-center'>
                                        <Check className='w-3 h-3 text-white' />
                                    </div>
                                </div>
                            )}
                            <div className="space-y-1">
                                <h4 className="font-medium text-gray-900">{template.name}</h4>
                                <div className="mt-2 p-2 bg-blue-50 rounded text-xs text-gray-500 italic">{template.preview}</div>
                            </div>
                        </div>
                    ))}
                </div>

            )}
        </div>
    )
}
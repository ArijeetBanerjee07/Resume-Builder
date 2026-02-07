import { useState } from "react";
import { Sparkles, X, Plus } from "lucide-react";

export default function SkillsForm({ data, onChange }) {
    const [newSkill, setNewSkill] = useState("");

    const addSkill = () => {
        if (newSkill.trim() && !data.includes(newSkill.trim())) {
            onChange([...data, newSkill.trim()]);
            setNewSkill("");
        }
    };

    const removeSkill = (indexToRemove) => {
        onChange(data.filter((_, index) => index !== indexToRemove));
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            addSkill();
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h3 className='flex items-center gap-2 text-lg font-semibold text-gray-900'>Skills</h3>
                <p className='text-sm text-gray-500'>Add your technical skills here</p>
            </div>

            <div className="flex gap-2">
                <input
                    type="text"
                    placeholder="Enter a skill (e.g., JavaScript, Project Management)"
                    className='flex-1 px-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
                    onChange={(e) => setNewSkill(e.target.value)}
                    value={newSkill}
                    onKeyDown={handleKeyPress}
                />
                <button
                    onClick={addSkill}
                    disabled={!newSkill.trim()}
                    className='flex items-center gap-2 px-6 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md'
                >
                    <Plus className="size-4" /> Add
                </button>
            </div>

            {data.length > 0 ? (
                <div className='flex flex-wrap gap-2 p-4 bg-gray-50 rounded-xl border border-gray-100'>
                    {data.map((skill, index) => (
                        <span key={index} className='group flex items-center gap-1.5 px-3 py-1.5 bg-white text-gray-700 border border-gray-200 rounded-full text-sm font-medium shadow-sm hover:border-blue-300 hover:text-blue-600 transition-all'>
                            {skill}
                            <button
                                onClick={() => removeSkill(index)}
                                className="ml-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full p-0.5 transition-colors"
                            >
                                <X className="w-3.5 h-3.5" />
                            </button>
                        </span>
                    ))}
                </div>
            ) : (
                <div className="text-center py-10 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                    <div className="bg-white p-3 rounded-full shadow-sm w-fit mx-auto mb-3">
                        <Sparkles className="w-6 h-6 text-blue-500" />
                    </div>
                    <p className="text-gray-900 font-medium">No skills added yet</p>
                    <p className="text-sm text-gray-500 mt-1">Start adding your technical and soft skills above</p>
                </div>
            )}

            <div className='flex gap-3 bg-blue-50 p-4 rounded-xl border border-blue-100 text-sm text-blue-800'>
                <Sparkles className="size-5 shrink-0 text-blue-600" />
                <p>
                    <strong className="font-semibold block mb-1 text-blue-900">Pro Tip</strong>
                    Add 8-12 relevant skills. Include both technical skills (programming languages, tools) and soft skills (leadership, communication) to show a well-rounded profile.
                </p>
            </div>
        </div>
    );
}
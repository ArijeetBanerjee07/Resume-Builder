import { BriefcaseBusiness, Globe, Linkedin, Mail, MapPin, Phone, User } from "lucide-react";

export default function PersonalInfoForm({ data, onChange, RemoveBackground, setRemoveBackgrond }) {
    const handleImageChange = (field, value) => {
        onChange({ ...data, [field]: value });
    }
    const fields = [
        { key: "full_name", label: "Full Name", icon: User, type: "text", required: true },
        { key: "email", label: "Email Address", icon: Mail, type: "email", required: true },
        { key: "phone", label: "Phone", icon: Phone, type: "tel" },
        { key: "location", label: "Location", icon: MapPin, type: "text" },
        { key: "profession", label: "Profession", icon: BriefcaseBusiness, type: "text" },
        { key: "linkedin", label: "LinkedIn Profile", icon: Linkedin, type: "url" },
        { key: "website", label: "Personal Website", icon: Globe, type: "url" }
    ]
    return (
        <div className="pr-12">
            <h3 className='text-lg font-semibold text-gray-900'>Personal Information</h3>
            <p className='text-sm text-gray-600'>Get Started with the personal information</p>
            <div className='flex items-center gap-2'>
                <label>
                    {data.image ? (
                        <img src={typeof data.image === 'string' ? data.image : URL.createObjectURL(data.image)} alt="user-image" className='w-16 h-16 rounded-full object-cover mt-5 ring ring-slate-300
                hover:opacity-80'/>
                    ) : (
                        <div className='inline-flex items-center gap-2 mt-5 text-slate-600 hover: text-slate-700 cursor-pointer'>
                            <User className='size-10 p-2.5 border rounded-full ' />
                            Upload User Image
                        </div>
                    )}
                    <input type="file" accept="image/jpeg , image/jpg , image/png" className="hidden" onChange={(e) => handleImageChange('image', e.target.files[0])} />
                </label>
                {typeof data.image === 'object' && (
                    <div className="flex flex-col gap-1 pl-4 text-sm">
                        <p>Remove Background</p>
                        <label className="relative inline-flex items-center gap-2 cursor-pointer text-gray-900 gap-3">
                            <input type="checkbox" checked={RemoveBackground} onChange={(e) => setRemoveBackgrond(prev => !prev)} className="sr-only peer" />
                            <div className='w-9 h-5 bg-slate-300 rounded-full peer peer-checked: bg-green-600 transition-colors duration-200 peer-checked:bg-blue-500'>
                            </div>
                            <span className='dot absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform duration -200 ease-in-out peer-checked:translate-x-4'></span>
                        </label>
                    </div>
                )}
            </div>

            {fields.map((field) => {
                const Icon = field.icon;
                return (
                    <div key={field.key} className="space-y-5 mt-6">
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
                            <Icon className="size-4" />
                            {field.label}
                            {field.required && <span className="text-red-500">*</span>}
                        </label>
                        <input type={field.type} value={data[field.key] || ""} onChange={(e) => handleImageChange(field.key, e.target.value)} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-1g focus: ring focus:ring-blue-500 focus: border-blue-500 outline-none transition-colors text-sm" placeholder={`Enter Your${field.label.toLowerCase()}`} required={field.required} />
                    </div>
                )
            })}


        </div>
    );
}
// controller for creating resume
// POST: /api/resumes/create

import Resume from "../models/Resume.js";
import imagekit, { toFile } from "../configs/imagekit.js";


export const createResume = async (req, res) => {
    try {
        const userId = req.userId;
        const { title } = req.body;
        // create new resume
        const newResume = await Resume.create({ userId, title });
        return res.status(201).json({ message: "resume created successfully", resume: newResume });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

// controller for deleting resume
// DELETE: /api/resumes/delete

export const deleteResume = async (req, res) => {
    try {
        const userId = req.userId;
        const { resumeId } = req.params;

        await Resume.findOneAndDelete({ userId, _id: resumeId });
        return res.status(200).json({ message: "resume deleted successfully" });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

// get user resume by id 
// GET: /api/resumes/get

export const getResumeById = async (req, res) => {
    try {
        const userId = req.userId;
        const { resumeId } = req.params;

        const resume = await Resume.findOne({ userId, _id: resumeId });
        if (!resume) {
            return res.status(404).json({ message: "Resume not found" });
        }
        resume.__v = undefined;
        resume.createdAt = undefined;
        resume.updatedAt = undefined;

        return res.status(200).json({ resume });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

// get resume by id public 
// GET: api/resumes/public

export const getPublicResumeById = async (req, res) => {
    try {
        const { resumeId } = req.params;
        const resume = await Resume.findOne({ public: true, _id: resumeId });
        if (!resume) {
            return res.status(404).json({ message: "Resume not found" });
        }
        // resume.__v = undefined;
        // resume.createdAt = undefined;
        // resume.updatedAt = undefined;
        return res.status(200).json({ resume });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

// controller for updating resume
// PUT: /api/resumes/update

export const updateResume = async (req, res) => {
    try {
        const userId = req.userId;
        const { resumeId, resumeData, removeBackground } = req.body;
        const image = req.file;

        console.log("=== Update Resume Request Details ===");
        console.log("userId:", userId);
        console.log("resumeId:", resumeId);
        console.log("hasFile (req.file):", !!image);
        if (image) {
            console.log("file details:", {
                fieldname: image.fieldname,
                originalname: image.originalname,
                mimetype: image.mimetype,
                size: image.size,
                hasBuffer: !!image.buffer
            });
        }
        console.log("removeBackground:", removeBackground);

        if (!resumeId) {
            return res.status(400).json({ message: "resumeId is required" });
        }

        // Fetch existing resume to preserve image if needed
        const existingResume = await Resume.findOne({ userId, _id: resumeId });
        if (!existingResume) {
            return res.status(404).json({ message: "Resume not found" });
        }

        let resumeDataCopy;
        try {
            if (typeof resumeData === 'string') {
                resumeDataCopy = JSON.parse(resumeData);
            } else {
                resumeDataCopy = structuredClone(resumeData);
            }
        } catch (parseError) {
            console.error("JSON Parse Error:", parseError);
            return res.status(400).json({ message: "Invalid resumeData format" });
        }

        // Initialize personal_info if missing
        if (!resumeDataCopy.personal_info) {
            resumeDataCopy.personal_info = existingResume.personal_info || {};
        }

        // If no new image is being uploaded, preserve the old one if it's missing from the request
        if (!image && !resumeDataCopy.personal_info.image) {
            resumeDataCopy.personal_info.image = existingResume.personal_info?.image || "";
        }

        let imageError = null;
        if (image && image.buffer) {
            console.log("Attempting ImageKit upload...");
            try {
                const response = await imagekit.files.upload({
                    file: await toFile(image.buffer, image.originalname),
                    fileName: `resume_${resumeId}_${Date.now()}.png`,
                    folder: 'user-resumes',
                    useUniqueFileName: true,
                    transformation: {
                        pre: `w-300,h-300,fo-face,z-0.75${removeBackground === "yes" ? ",e-bgremove" : ""}`
                    }
                });
                console.log("ImageKit upload response:", JSON.stringify(response, null, 2));
                resumeDataCopy.personal_info.image = response.url;
            } catch (ikError) {
                console.error("ImageKit error (details):", ikError);
                imageError = ikError.message || "Upload failed";
                // Preserve old image if upload fails
                if (!resumeDataCopy.personal_info.image) {
                    resumeDataCopy.personal_info.image = existingResume.personal_info?.image || "";
                }
            }
        }

        const resume = await Resume.findOneAndUpdate(
            { userId, _id: resumeId },
            { $set: resumeDataCopy },
            { new: true }
        );

        if (!resume) {
            return res.status(404).json({ message: "Resume not found" });
        }

        return res.status(200).json({
            message: imageError ? `Saved successfully (BUT image upload failed: ${imageError})` : "Saved successfully",
            resume,
            imageError
        });
    } catch (error) {
        console.error("General Update Resume Error:", error);
        return res.status(500).json({ message: error.message });
    }
};



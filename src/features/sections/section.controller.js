
import Section from './section.model.js';

class SectionController {
    // Get all sections
    async getSections(req, res) {
        try {
            const sections = await Section.find().populate('tasks').sort({ createdAt: 1 });
            res.status(200).json(sections);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching sections', error });
        }
    }

    // Add new section
    async addSection(req, res) {
        try {
            const { name, selectedSectionId } = req.body;
            let creationDate = new Date();

            if(selectedSectionId){
                const selectedSection = await Section.findById(selectedSectionId);
                if(selectedSection){
                    creationDate = new Date(new Date(selectedSection.createdAt).getTime() + 1000);
                }
            }

            const newSection = new Section({ name, tasks: [], createdAt: creationDate });
            await newSection.save();
            res.status(201).json(newSection);
        } catch (error) {
            res.status(400).json({ message: 'Error adding section', error });
        }
    }

    // Delete section
    async deleteSection(req, res) {
        try {
            const { id } = req.params;
            await Section.findByIdAndDelete(id);
            res.status(200).json({ message: 'Section deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting section', error });
        }
    }

    //Update section
    async updateSection(req, res) {
        try {
            const { id } = req.params;
            const { name } = req.body;
            const updatedSection = await Section.findByIdAndUpdate(id, { name }, { new: true });
            res.status(200).json(updatedSection);
        } catch (error) {
            res.status(500).json({ message: 'Error updating section', error });
        }
    }
}

export default new SectionController();

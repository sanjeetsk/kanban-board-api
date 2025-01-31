
import Section from './section.model.js';

class SectionController {
    // Get all sections
    async getSections(req, res) {
        try {
            const sections = await Section.find().populate('tasks');
            res.status(200).json(sections);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching sections', error });
        }
    }

    // Add new section
    async addSection(req, res) {
        try {
            const { name } = req.body;
            const newSection = new Section({ name, tasks: [] });
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
}

export default new SectionController();

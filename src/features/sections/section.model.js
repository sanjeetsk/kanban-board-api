
import mongoose from 'mongoose';

const sectionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }]
}, { timestamps: true });

const Section = mongoose.model('Section', sectionSchema);
export default Section;

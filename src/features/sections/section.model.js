// export default class SectionModel{
//     constructor(
//         id,
//         name,
//         tasks = [{}]
//     ){
//         this.id = id;
//         this.name = name;
//         this.tasks = tasks;
//     }

//     static getSections(){
//         return sections;
//     }
//     static addSection(section){
//         sections.push(section);
//     }
//     static updateSection(id, section){
//         const index = this.sections.findIndex((section) => section.id === id);
//         sections[index] = section;
//     }
//     static deleteSection(id){
//         sections = this.sections.filter((section) => section.id !== id);
//     }
//     static getOneSection(id){
//         return sections.find((section) => section.id === id);
//     }
// }

// let sections = [
//     new SectionModel(1, 'To Do', []),
//     new SectionModel(2, 'In Progress', []),
//     new SectionModel(3, 'Done', []),
// ]

import mongoose from 'mongoose';

const sectionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }]
}, { timestamps: true });

const Section = mongoose.model('Section', sectionSchema);
export default Section;

const fs = require('fs')
const chalk = require('chalk')

const getNotes = () => {
    return "Your Notes ..."
}

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicate = notes.find((note) => note.title === title)

    if (!duplicate) {
        notes.push({
            title,
            body  
        })
    
        saveNotes(notes)
        console.log('New note added')
    } else {
        console.log('Duplicate title')
    }
    
}

const removeNote = (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter((note) => note.title !== title )

    saveNotes(notesToKeep)
    if ( notesToKeep.length < notes.length ) {
        console.log(chalk.bgGreen("Note Removed!"))
    } else {
        console.log(chalk.bgRed("No Note Found!"))
    }
}

const listNotes = () => {
    const notes = loadNotes()

    notes.forEach(item => { console.log(chalk.bold(item.title)) })
}

const readNote = (title) => {
    const notes = loadNotes()
    const target = notes.find((note) => note.title === title)

    if (target) {
        console.log(chalk.inverse(target.title))
        console.log(target.body)
    } else {
        console.log(chalk.red.inverse('Note Not Found!'))
    }
}


const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

module.exports = {
    getNotes,
    addNote,
    removeNote,
    listNotes,
    readNote
}
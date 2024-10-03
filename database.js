import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

// const [result] = await pool.query("SELECT * FROM notes");
// console.log(result);

const allNotes = async function () {
  const [notes] = await pool.query("SELECT * FROM notes");
  return notes;
};
console.log(await allNotes());

const fetchNoteById = async function (id) {
  const [note] = await pool.query("SELECT * FROM notes WHERE id=?", [id]);
  return note;
};
// console.log(await fetchNoteById(1));

const saveNote = async function (title, contents) {
  const [insertedData] = await pool.query(
    "INSERT INTO notes(title, contents) VALUES(?,?)",
    [title, contents]
  );
  return await fetchNoteById(insertedData.insertId);
};
// console.log(await saveNote("test4", "test4"));

const updateNote = async function (id, title, contents) {
  const updatedData = await pool.query(
    "UPDATE notes SET title=?, contents=?, created=Now() WHERE id=?",
    [title, contents, id]
  );
  return await fetchNoteById(id);
};
// console.log(await updateNote(5, "This is a note1", "This is the content1"));

const deleteNote = async function (id) {
  const recordToBeDeleted = await fetchNoteById(id);
  await pool.query("DELETE FROM notes WHERE id=?", [id]);
  return recordToBeDeleted;
};
// console.log(await deleteNote(4));

import { pool } from '../db.js';

// Create a new resume
export const createResume = async (req, res) => {
  const userEmail = req.user.email;
   const { title, resumeId } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO user_resumes (title, resume_id, user_email, user_name)
       VALUES ($1, $2, $3, $4) RETURNING id`,
      [title, resumeId, userEmail, userEmail]
    );

    res.status(201).json({
      data: {
        documentId: result.rows[0].id
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all resumes for a  user
export const getUserResumes = async (req, res) => {
  const userEmail = req.user.email;

  if (!userEmail) return res.status(400).json({ error: 'userEmail is required' });

  try {
    const result = await pool.query(
      'SELECT * FROM user_resumes WHERE user_email = $1 ORDER BY created_at DESC',
      [userEmail]
    );
    res.json({ data: result.rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get resume by ID
export const getResumeById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('SELECT * FROM user_resumes WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Resume not found' });
    const {
      firstname,
      lastname,
      jobtitle,
      address,
      phone,
      email,
      github,
      website,
      collegemail,
      linkedin,
      branch,
      rollno,
      education,
      experience,
      skills,
      summery,
      projects,
      positionofresponsibility,
      achievement,
      certificates,
      keycourses,
      publications,
      links
    } = result.rows[0];
    console.log(result.rows[0]);

    res.json({
      data: {
        firstname,
        lastname,
        jobtitle,
        address,
        phone,
        email,
        github,
        website,
        collegemail,
        linkedin,
        branch,
        rollno,
        education,
        experience,
        skillsSummary:skills,
        summery,
        projects,
        positionOfResponsibility:positionofresponsibility,
        achievement,
        certificates,
        keyCourses: keycourses,
        publications,
        links
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update resume fields
export const updateResume = async (req, res) => {
  const { id } = req.params;
  const fields = req.body.data;
  console.log(fields)
  if (!fields || typeof fields !== 'object') {
    return res.status(400).json({ error: 'Invalid update payload ' });
  }

  try {
    const jsonFields = ['experience', 'education', 'skills','projects','positionOfResponsibility','achievement','certificates','keyCourses','publications','links']; // Add more if needed

    const keys = Object.keys(fields);
    const values = keys.map(key => {
      const val = fields[key];
      return jsonFields.includes(key)
        ? JSON.stringify(val) 
        : val;
    });
    
    const setClause = keys.map((key, i) => `${key} = $${i + 1}`).join(', ');

    const query = `
      UPDATE user_resumes
      SET ${setClause}, updated_at = CURRENT_TIMESTAMP
      WHERE id = $${keys.length + 1}
      RETURNING *
    `;

    console.log("Query:\n", query);
    console.log("Values:\n", values);

    const result = await pool.query(query, [...values, id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Resume not found' });
    }

    res.json({ success: true, message: 'Updated successfully', data: result.rows[0] });
  } catch (err) {
    console.error('Update failed:', err);
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
};

// Delete resume by ID
export const deleteResume = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM user_resumes WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0)
      return res.status(404).json({ error: 'Resume not found' });

    res.json({ message: 'Resume Deleted!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
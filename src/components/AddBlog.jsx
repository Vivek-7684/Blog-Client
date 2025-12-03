import TextField from '@mui/material/TextField';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { blogSchema } from '../validation.js';
import { Alert } from '@mui/material';
import { api } from '../api/api';

export default function Form() {

  const Navigate = useNavigate();

  const [form, setForm] = useState({}); // form data
  const [error, setError] = useState({}); // real time error

  const [alert, setAlert] = useState({  // alert messages
    show: false,
    type: "",
    messages: []
  });

  const handleChange = (e) => {

    // validation only when user type data 
    if (e.target.value.trimStart() === "") {
      e.target.value = "";
    }

    if (e.target.value.trim() === "") {
      setForm({ ...form, [e.target.name]: "" });

      const newErrors = { ...error };
      delete newErrors[e.target.name]; //remove only that field error
      setError(newErrors);

      return; //  no validation for empty 
    }

    const updatedFields = { ...form, [e.target.name]: e.target.value };

    setForm(updatedFields);

    const result = blogSchema.safeParse(updatedFields);

    if (!result.success) {
      setError(result.error.flatten().fieldErrors);
    } else {
      setError({});
    }
  };

  const AddBlog = (e) => {

    e.preventDefault();

    const { title, content, image } = e.target;

    if (!title || !content || !image) {
      setAlert({
        show: true,
        type: "error",
        messages: ["All Fields are Required."]
      })
      setTimeout(() => {
        setAlert({
          show: false,
          type: "",
          messages: []
        })
      }, 2000);
      return false;
    }

    const fd = new FormData();

    for (let key in form) fd.append(key, form[key]);

    api.post("/addBlog", fd)
      .then(() => {
        setAlert({
          show: true,
          type: "success",
          messages: ["Blog added successfully"]
        });

        setTimeout(() => {
          setAlert({ show: false, type: "", messages: [] });
        }, 3000);
      })
      .catch((err) => {

        let messages = [];

        if (Array.isArray(err.response.data)) {
          messages = err.response.data.map((errmsg) => errmsg.msg);
        } else {
          messages = [err.response.data];
        }

        setAlert({
          show: true,
          type: "error",
          messages
        });

        setTimeout(() => {
          setAlert({ show: false, type: "", messages: [] });
        }, 3000);

      });
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];
    const name = e.target.name; // "Image"

    // user removed file
    if (!file) {
      setError({ ...error, [name]: ["Image is required"] });
      setForm({ ...form, [name]: "" });
      return;
    }

    // store file in state
    setForm({ ...form, [name]: file });

    // remove error if upload
    const newErrors = { ...error };
    delete newErrors[name];
    setError(newErrors);
  };


  return (
    <>

      <Box sx={{ width: '40vw', height: '80vh', px: 2, display: 'flex', flexDirection: 'row', gap: '1rem' }}>
        {alert.show &&
          alert.messages.map((msg, idx) => (
            <Alert
              key={idx}
              severity={alert.type}
              sx={{ m: 2, width: "40vw", position: "absolute", top: 55, left: '70' }}
              onClose={() => setAlert({ show: false, type: "", messages: [] })}
            >
              {msg}
            </Alert>
          ))
        }
        <form style={{ height: '80vh' }}>
          <Typography variant='h5'>Blogs </Typography>

          <TextField
            error={error?.title}
            helperText={error?.title?.join(".")}
            value={form?.title || ""}
            label="Title"
            name="title"
            margin="normal"
            onChange={handleChange}
            variant='outlined'
            fullWidth
          />

          <TextField
            error={error?.content}
            helperText={error?.content?.join(".")}
            value={form?.content || ""}
            label="Content"
            name="content"
            margin="normal"
            onChange={handleChange}
            variant='outlined'
            rows={6}
            multiline
            fullWidth
          />

          <TextField
            error={error?.image}
            accept="image/png,image/jpeg,image/webp"
            helperText={error?.image?.join(".")}
            onChange={handleUpload}
            name="image"
            margin="normal"
            variant='outlined'
            rows={6}
            type="file"
            fullWidth
          />

          {/* <TextField
            error={error?.category}
            helperText={error?.category?.join(".")}
            value={filter?.category || ""}
            select
            label="category"
            name="category"
            margin="normal"
            variant='outlined'
            onChange={handleChange}
            fullWidth
          >
            <MenuItem value="Technologies">Technologies</MenuItem>
            <MenuItem value="Food">Food</MenuItem>
            <MenuItem value="News">News</MenuItem>
            <MenuItem value="Politics">Politics</MenuItem>
          </TextField> */}

          <Button disabled={Object.keys(error).length > 0}
            fullWidth sx={{ p: 2, color: 'white', bgcolor: 'orange', fontSize: '16px', fontWeight: '700' }}
            variant='contained'
            onClick={(e) => AddBlog(e)}>Add Blog</Button>
        </form>
      </Box>
    </>
  );
}
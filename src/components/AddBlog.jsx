import TextField from '@mui/material/TextField';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { blogSchema } from '../validation.js';
import { Alert } from '@mui/material';
import { api } from '../api/api';
import { Avatar } from '@mui/material';
import { Stack } from '@mui/material';
import { useRef } from "react";


export default function Form() {

  const Navigate = useNavigate();

  const [form, setForm] = useState({}); // form data
  const [error, setError] = useState({}); // real time error

  const [alert, setAlert] = useState({  // alert messages
    show: false,
    type: "",
    messages: []
  });

  const [Image, setImage] = useState('');

  const fileRef = useRef();

  const [sections, setSections] = useState([]);

  const addSection = () => {
    setSections([...sections, { subTitle: "", content: "", image: "", preview: "" }]);
  }

  const removeSection = (index) => {
    setSections(sections.filter((_, idx) => index != idx));
  }

  const handleSectionChange = (index, e) => {
    const { name, value } = e.target;

    setSections((prev) => {
      const updatedSections = [...prev];
      updatedSections[index] = {
        ...updatedSections[index],
        [name]: value
      }
      return updatedSections;
    });
  };

  const handleSectionImageUpload = (index, e) => {

    const file = e.target.files[0];

    if (!file) {
      setSections((prev) => {
        const updated = [...prev];
        updated[index] = {
          ...updated[index],
          image: null,
          preview: ""
        };
        return updated;
      });
      return;
    }

    const previewImage = URL.createObjectURL(file);

    setSections((prev) => {
      const updatedSections = [...prev];
      updatedSections[index] = {
        ...updatedSections[index],
        preview: previewImage,
        image: file
      }
      return updatedSections;
    });

  }


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

    if (!form.title || !form.content || !form.image) {
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

    const sectionsServer = sections.map((sec) => ({
      subTitle: sec.subTitle,
      content: sec.content
    }))

    fd.append("sections", JSON.stringify(sectionsServer));

    sections.forEach((sec) => {
      if (sec.image) {
        fd.append(`sectionImages[${index}]`, sec.image);
      }
    });

    api.post("/addBlog", fd)
      .then(() => {
        setImage('');

        setSections([]);

        setAlert({
          show: true,
          type: "success",
          messages: ["Blog added successfully"]
        });

        setTimeout(() => {
          setAlert({ show: false, type: "", messages: [] });
        }, 3000);

        setForm({});
        fileRef.current.value = "";
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
      setImage("");
      setError({ ...error, [name]: ["Image is required"] });
      setForm({ ...form, [name]: "" });
      return;
    }

    // store file in state and for preview
    setForm({ ...form, [name]: file });
    setImage(URL.createObjectURL(e.target.files[0]));


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
            label="Tags"
            name="tags"
            error={error?.tags}
            margin='normal'
            fullWidth
            value={form?.tags || ""}
            helperText={"Examples:- Reactjs, Nodejs, CPP"}
            onChange={handleChange}
          />

          <TextField
            label="Summary"
            name="summary"
            error={error?.summary}
            margin='normal'
            fullWidth
            value={form?.summary || ""}
            onChange={handleChange}
          />

          <TextField
            label="Quote"
            name="quote"
            error={error?.quote}
            margin='normal'
            fullWidth
            value={form?.quote || ""}
            onChange={handleChange}
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
            inputRef={fileRef}
          />

          {Image && <img src={Image} width={'250'} height={'250'} />}

          <Typography variant='h6' sx={{ mt: 3 }}>Sections</Typography>

          {sections.map((section, idx) =>
          (
            <Box
              key={idx}
              sx={{
                border: "1px solid #ddd",
                borderRadius: 2,
                p: 2,
                mb: 2,
              }}
            >
              <Typography variant="subtitle1">
                Section {idx + 1}
              </Typography>

              <TextField
                // error={error?.title}
                // helperText={error?.title?.join(".")}
                value={section?.subTitle || ""}
                label="Sub Title"
                name="subTitle"
                margin="normal"
                onChange={(e) => handleSectionChange(idx, e)}
                variant='outlined'
                fullWidth
              />

              <TextField
                // error={error?.content}
                // helperText={error?.content?.join(".")}
                value={section?.content || ""}
                label="Content"
                name="content"
                margin="normal"
                onChange={(e) => handleSectionChange(idx, e)}
                variant='outlined'
                rows={6}
                multiline
                fullWidth
              />

              <TextField
                type={"file"}
                margin="normal"
                fullWidth
                inputProps={{ accept: "image/png,image/jpeg,image/webp" }}
                onChange={(e) => handleSectionImageUpload(idx, e)}
              />

              {sections.preview && (
                <img
                  src={sections[idx]?.preview}
                  width="200"
                  height="200"
                  style={{ marginTop: "8px", objectFit: "cover" }}
                />
              )}

              <Button
                sx={{ mt: 1 }}
                variant="text"
                color="error"
                onClick={() => removeSection(idx)}
              >
                Remove Section
              </Button>


            </Box>
          )
          )}

          <Button sx={{ mt: 1, mb: 2 }} variant='outlined' onClick={addSection}>Add Section</Button>

          <Typography variant='h6' sx={{ mt: 3, mb: 3 }}>Author Details</Typography>

          <Box
            sx={{
              border: "1px solid #ddd",
              borderRadius: 2,
              p: 2,
              mb: 2,
            }}
          >
            <TextField
              label="Author"
              name="author"
              margin='normal'
              fullWidth
              value={form?.author || ""}
              onChange={handleChange}
            />

            <TextField
              label="Occupation"
              name="occupation"
              margin='normal'
              fullWidth
              value={form?.occupation || ""}
              onChange={handleChange}
            />
          </Box>

          <Button disabled={Object.keys(error).length > 0}
            fullWidth sx={{ p: 2, my: 3, color: 'white', bgcolor: 'orange', fontSize: '16px', fontWeight: '700' }}
            variant='contained'
            onClick={(e) => AddBlog(e)}>Add Blog</Button>
        </form>
      </Box>
    </>
  );
}
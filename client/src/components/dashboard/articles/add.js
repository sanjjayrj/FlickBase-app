import React, { useState, useEffect, useRef } from 'react';
import AdminLayout from '../../../hoc/adminLayout';
import { useFormik, FieldArray, FormikProvider } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { validation, formValues } from './validationSchema';

import WYSIWYG from '../../../utils/forms/wysiwyg';

import {
    TextField,
    Button,
    Divider,
    Chip,
    Paper,
    InputBase,
    IconButton,
    Select,
    MenuItem,
    FormControl,
    FormHelperText
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';


const AddArticle = (props) => {
    const [editorBlur, setEditorBlur] = useState(false);
    const actorsValue = useRef('');
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: formValues,
        validationSchema: validation,
        onSubmit: (values, { resetForm }) => {
            console.log(values)
        }
    });

    const handleEditorState = (state) => {
        formik.setFieldValue('content', state, true);
    }

    const handleEditorBlur = (blur) => {
        setEditorBlur(true);
    }

    const errorHelper = (formik, values) => ({
        error: formik.errors[values] && formik.touched[values] ? true : false,
        helperText: formik.errors[values] && formik.touched[values] ? formik.errors[values] : null
    });

    return (
        <AdminLayout section="Add article">
            <form className="mt-3 article_form" onSubmit={formik.handleSubmit}>
                <div className="form-group">
                    <TextField
                        style={{ width: '100%' }}
                        name="title"
                        label="Enter a title"
                        variant="outlined"
                        {...formik.getFieldProps('title')}
                        {...errorHelper(formik, 'title')}
                    />
                </div>

                <div className="form-group">
                    <WYSIWYG
                        setEditorState={(state)=> handleEditorState(state)}
                        setEditorBlur={(blur)=> handleEditorBlur(blur)}
                    />

                    {
                        formik.errors.content && editorBlur ?
                            <FormHelperText error={true}>
                                {formik.errors.content}
                            </FormHelperText>
                            : null
                    }

                    <TextField
                        type="hidden"
                        name="content"
                        {...formik.getFieldProps('content')}
                    />
                </div>

                <div className="form-group">
                    <TextField
                        style={{ width: '100%' }}
                        name="excerpt"
                        label="Enter an excerpt"
                        variant="outlined"
                        {...formik.getFieldProps('excerpt')}
                        {...errorHelper(formik, 'excerpt')}
                        multiline
                        rows={4}
                    />
                </div>

                <Divider className="mt-3 mb-3" />
                <h5>Movie Data and Score</h5>
                <div className="form-group">
                    <TextField
                        style={{ width: '100%' }}
                        name="score"
                        label="Enter the score"
                        variant="outlined"
                        {...formik.getFieldProps('score')}
                        {...errorHelper(formik, 'score')}
                    />
                </div>

                <FormikProvider value={formik}>
                    <h5>Add the actors:</h5>
                    <FieldArray
                        name="actors"
                        render={arrayhelpers => (
                            <div>
                                <Paper className="actors_form">
                                    <InputBase
                                        inputRef={actorsValue}
                                        className="input"
                                        placeholder="Add actor name here"
                                    />
                                    <IconButton
                                        onClick={()=>{
                                            arrayhelpers.push(actorsValue.current.value)
                                            actorsValue.current.value = ''
                                        }}
                                    >
                                        <AddIcon />
                                    </IconButton>
                                </Paper>
                                {
                                    formik.errors.actors && formik.touched.actors ?
                                        <FormHelperText error={true}>
                                            {formik.errors.actors}
                                        </FormHelperText>
                                        : null
                                }
                                <div className="chip_container">
                                    {formik.values.actors.map((actor, index) => (
                                        <div key={index}>
                                            <Chip
                                                label={`${actor}`}
                                                color="primary"
                                                onDelete={()=> arrayhelpers.remove(index)}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    />
                </FormikProvider>

                <div className="form-group">
                    <TextField
                        style={{ width: '100%' }}
                        name="director"
                        label="Enter the director's name"
                        variant="outlined"
                        {...formik.getFieldProps('director')}
                        {...errorHelper(formik, 'director')}
                    />
                </div>

                <FormControl variant="outlined">
                    <h5>Select a status</h5>
                    <Select
                        name="status"
                        {...formik.getFieldProps('status')}
                        error={formik.errors.status && formik.touched.status ? true : false}
                    >
                        <MenuItem value=''>
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value="draft">Draft</MenuItem>
                        <MenuItem value="public">Public</MenuItem>

                    </Select>
                    {
                        formik.errors.status && formik.touched.status ?
                            <FormHelperText error={true}>
                                {formik.errors.status}
                            </FormHelperText>
                            : null
                    }
                </FormControl>

                <Divider className="mt-3 mb-3" />
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={false}
                >
                    Add article
                </Button>
            </form>
        </AdminLayout>
    )
}

export default AddArticle;
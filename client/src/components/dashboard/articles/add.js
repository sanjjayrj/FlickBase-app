import React,{ useState, useEffect, useRef } from 'react';
import AdminLayout from '../../../hoc/adminLayout';
import { useFormik, FieldArray, FormikProvider } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { validation, formValues } from './validationSchema';
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

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: formValues,
        validationSchema: validation,
        onSubmit:(values,{resetForm}) => {
            console.log(values)
        }
    })
    const errorHelper = (formik, values) => ({
        error: formik.errors[values] && formik.touched[values] ? true : false,
        helperText: formik.errors[values] && formik.touched[values] ? formik.errors[values] : null
    });

    return(
        <AdminLayout section="Add articlee">
            <form className="mt-3 article_form" onSubmit={formik.handleSubmit}>
                <div className="form-group">
                    <TextField
                        style={{width:'100%'}}
                        name="title"
                        label="Enter a title"
                        variant="outlined"
                        {...formik.getFieldProps('title')}
                        {...errorHelper(formik,'title')}
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
                <h4>Movie Data and Score</h4>
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

                <Divider className="mt-3 mb-3"/>
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
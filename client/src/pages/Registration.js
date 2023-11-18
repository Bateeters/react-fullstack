import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

function Registration() {
    const initialValues ={
        username: "",
        password: ""
    };


    const validationSchema = Yup.object().shape({
        username: Yup.string().min(6).max(24).required(),
        password: Yup.string().min(8).max(20).required()
    });

    const onSubmit = (data) => {
        axios.post("http://localhost:3001/auth", data).then(()=>{
            console.log(data);
        });
    };

    return (
        <div>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form>
                    <label>Username: </label>
                    <ErrorMessage name="username" component="span"/>
                    <Field autoComplete="off" id="inputCreateRecipe" name="username" placeholder="(Username)"/>
                    <label>Password: </label>
                    <ErrorMessage name="password" component="span"/>
                    <Field type="password" autoComplete="off" id="inputCreateRecipe" name="password" placeholder="(Your Password)"/>
                    <button type="submit"> Register </button>
                </Form>
            </Formik>
        </div>
    );
}

export default Registration;
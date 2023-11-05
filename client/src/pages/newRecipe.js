import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function newRecipe() {
    const initialValues ={
        title: "",
        stepsText: "",
        username: ""
    };


    const validationSchema = Yup.object().shape({
        title: Yup.string().required(),
        stepsText: Yup.string().required(),
        username: Yup.string().min(8).max(24).required()
    });

    const onSubmit = (data) => {
        console.log(data)
    };

    return (
        <div className='createRecipePage'>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form>
                    <label>Title: </label>
                    <ErrorMessage name="title" component="span"/>
                    <Field id="inputCreateRecipe" name="title" placeholder="(Title)"/>
                    <label>Steps: </label>
                    <ErrorMessage name="stepsText" component="span"/>
                    <Field id="inputCreateRecipe" name="stepsText" placeholder="(Steps)"/>
                    <label>Username: </label>
                    <ErrorMessage name="username" component="span"/>
                    <Field id="inputCreateRecipe" name="username" placeholder="(Username)"/>
                    <button type="submit">Add Recipe</button>
                </Form>
            </Formik>
        </div>
   );
}

export default newRecipe;
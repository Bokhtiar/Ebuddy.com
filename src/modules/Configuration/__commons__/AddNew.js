import React, { useState } from "react";
import { postData } from "../../../scripts/api-service";
import { alertPop } from "../../../scripts/message";
import { CreateForm } from "../../commons/CreateForm";

export default ({
  setModal,
  refresh,
  edit,
  create_api,
  edit_api,
  list_api,
  fields,
  form,
  isView,
  flag,
  setColor,
  title
}) => {
  const [loading, setLoading] = useState();

  const submit = async (value, form) => {
    let max = value?.max_emp || value?.end_rating,
        min = value?.min_emp || value?.start_rating,
        fromRequired= false,
        toRequired= false;

    if (('max_emp' in value) && ('min_emp' in value)) {
      if (!value?.min_emp) fromRequired = true;
      if (!value?.max_emp) toRequired = true;
    }

    if (('end_rating' in value) && ('start_rating' in value)) {
      if (!value?.start_rating) fromRequired = true;
      if (!value?.end_rating) toRequired = true;
    }

    if (fromRequired) alertPop('error', "From field value is required!");
    if (toRequired) alertPop('error', "To field value is required!");
    
    if (fromRequired || toRequired) return false;

    if (min && max) {
      if (max < min ) {
        alertPop('error', "From value must be lower than to value");
        return false;
      }
    }

    if(flag === 'color'){
      if(('color' in value)){
        const color = value?.color?.hex ? value?.color?.hex : value?.color ? value?.color : '';
        value.color = color;
      }
    }

    setLoading(true);
    
    const editURL = () => {
      let editURL = ``;
      if(edit){
        if(title === 'Project Management') editURL =`${edit_api}` ;
        else editURL =`${edit_api}/${edit.id}` ;
      }
      return editURL;
    }

    const res = await postData(edit ? editURL() : create_api, {
      ...value,
    });

    if (res) {
      form.resetFields();
      refresh(list_api);
      setModal(false);
      alertPop('success', "The process has completed successfully");
    }
    setLoading(false);
  };

  return (
    <CreateForm submit={submit} fields={fields} loading={loading} edit={edit} isView={isView} setColor={setColor} flag={flag}/>
  );
};

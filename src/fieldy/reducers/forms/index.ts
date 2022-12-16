import { CREATE_FORM, REMOVE_FORM } from "fieldy/actions/registry";
import { FormActionPlayload, IAction } from "fieldy/interfaces";
import { FormsState } from "..";
import { formReduce } from "./form";

export function formsReduce(state: FormsState, action: IAction<FormActionPlayload>): FormsState {
  if (action.payload) {
    switch (action.type) {
      case REMOVE_FORM:
        return {
          ...state,
          [action.payload.formName]: undefined,
        }
      case CREATE_FORM:
        return {
          ...state,
          [action.payload.formName]: {
            fields: {},
            fieldSchemas: [],
          }
        }
    }
    const formSate = state[action.payload.formName]
    if (action.payload.formName && formSate) {
      return {
        ...state,
        [action.payload.formName]: formReduce(formSate, action)
      }
    }
  }

  return state
}
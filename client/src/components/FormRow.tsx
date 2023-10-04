interface IFormRow {
  type: string;
  name: string;
  labelText?: string;
  defaultValue?: string;
  placeHolder?: string;
}

const FormRow: React.FC<IFormRow> = ({
  type,
  name,
  labelText,
  defaultValue,
  placeHolder,
}) => {
  return (
    <div className='form-row'>
      <label htmlFor={name}>{labelText || name}</label>
      <input
        type={type}
        name={name}
        id={name}
        defaultValue={defaultValue || ""}
        placeholder={placeHolder || ""}
        required
      />
    </div>
  );
};
export default FormRow;

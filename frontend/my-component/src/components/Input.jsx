function Input({ label, type="text", value, onChange }) {
  return (
    <div className="form-control">
      <label>{label}</label>
      <input type={type} value={value} onChange={onChange} />
    </div>
  );
}

export default Input;

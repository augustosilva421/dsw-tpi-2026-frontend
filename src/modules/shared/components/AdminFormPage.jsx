function AdminFormPage({ children, className = '' }) {
  return (
    <div
      className={`flex max-w-full flex-col [&_input:not([type=checkbox])]:rounded-[3px] [&_input:not([type=checkbox])]:border-slate-300 [&_select]:rounded-[3px] [&_select]:border-slate-300 [&_textarea]:rounded-[3px] [&_textarea]:border-slate-300 [&_button:disabled]:cursor-not-allowed [&_button:disabled]:opacity-60 ${className}`}
    >
      {children}
    </div>
  );
}

export default AdminFormPage;

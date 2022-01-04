const DeleteConfirmModal = ({ deleteConfirmationBox, onConfirmDelete, setDeleteConfirmationBox }) => {
    return (
        <div id="confirm" className={deleteConfirmationBox ? "modal-box-wrap show" : "modal-box-wrap"}>
            <div className="modal-box">
                <p className="title">Are you  sure to delete the address?</p>
                <div className="btns">
                    <button
                        onClick={onConfirmDelete}
                        className="btn yes"
                        style={{ background: "var(--primary-color-secondary)" }}
                    >
                        <span>Yes</span>
                    </button>
                    <button
                        onClick={() => { setDeleteConfirmationBox(false) }}
                        className="btn no"
                    >
                        <span>No</span>
                    </button>
                </div>
            </div>
        </div>
    )
};

export default DeleteConfirmModal;
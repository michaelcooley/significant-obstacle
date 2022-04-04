import TextField from '@material-ui/core/TextField';

export function CommandWindow(props) {
    return (
        <div className="command-input-container">
            <div className="command-input-label-container">{props.prompt}</div>
            <div className="command-input-entry-container">
                <TextField
                    onKeyPress={props.onKeyPress}
                    InputProps={{ style: { fontSize: 14 } }}
                />
            </div>
        </div>
    );
}
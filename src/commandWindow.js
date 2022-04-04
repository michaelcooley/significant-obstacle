import TextField from '@material-ui/core/TextField';

export function CommandWindow(props) {
    return (
        <div class="command-input-container">
            <div class="command-input-label-container">{props.prompt}</div>
            <div class="command-input-entry-container">
                <TextField
                    onKeyPress={props.onKeyPress}
                    InputProps={{ style: { fontSize: 14 } }}
                />
            </div>
        </div>
    );
}
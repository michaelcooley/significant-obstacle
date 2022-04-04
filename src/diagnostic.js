export function Diagnostic(props) {

    if ((props.locations != undefined) && (props.items != undefined)) {
        return <p class="diagnostic-container">
            {props.locations.length} locations, {props.items.length} items
        </p>
    } else
        return <p className="diagnostic-container">
        </p>;
}
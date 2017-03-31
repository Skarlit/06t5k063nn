export default (props) => {
  let style = props.style || {};
  style.background = `url(${props.image})`;
  style.width = props.width;
  style.height = props.height;
  return <div className="avatar" style={style}>
    {props.children}
  </div>;
}
;

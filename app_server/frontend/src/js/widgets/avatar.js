export default (props) => {
  let style = {};
  style.background = `url(${props.blob || props.url})`;
  style.width = props.width;
  style.height = props.height;
  return <div className="avatar" style={style}>
    {props.children}
  </div>;
}
;

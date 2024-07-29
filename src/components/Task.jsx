function Task(props) {
  return (
    <div className="w-[100%] h-[4rem] border-[1px] border-black mx-auto flex items-center justify-center hover:cursor-pointer">
      <p className="text-[1.5rem]">{props.name}</p>
    </div>
  );
}

export default Task;

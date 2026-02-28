pragma solidity ^0.5.0;

contract TodoList{
    uint public task_count=0;

    struct Task{
        uint id;
        string content;
        bool completed;
    }

    mapping (uint => Task) public tasks; // we are not only building an instance of our task dtype, 
    // but also for each task map them with an integer(unsigned: can be negative) id - key:value pair

    // Since this is not a RemixIDe , thus we can't test deployed contracts..lets thus build a constructore 
    // that during the time oh initialisation once creates a task in the storage for us..
    constructor() public {
        createTask("Find a BlackHole hiding in the vastness of Universe");
    }

    event taskcreated(
        uint id,
        string content,
        bool completed
    ); // an event simply tells a user that a transactionhas succesfully been processed

    function createTask(string memory _content) public {
        task_count++;
        // besides increasing the count of to-do tasks, for every id key we are assigning it the content 
        // of the new task
        tasks [task_count] = Task(task_count, _content, false);
        // now that the task is created, how do the user know that a task is created and stored in memory ?
        // this is why we need to declare an event.
        emit taskcreated(task_count, _content, false); // false as the task is just being created for to-do
    } 

    event TaskCompleted(
        uint id,
        bool completed
    );

    function toggleTask(uint _id) public {
        Task memory _task = tasks[_id]; // retrieving info about a particular task with its id
        _task.completed = ! _task.completed; // reverse the completion state of the task 
        tasks[_id]=_task;

        // again to let user know that the task is marked as completed, trigger an event
        emit TaskCompleted(_id, _task.completed);
    }

}
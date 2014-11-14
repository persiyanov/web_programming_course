$(function () {
    function getTotal() {
        return +($('.total>span').text());
    }
    
    function getAccomplished() {
        return +($('.accomplished>span').text());
    }
    
    function updateTotal(newValue) {
        $('.total>span').text(newValue);
    }
    
    function updateAccomplished(newValue) {
        $('.accomplished>span').text(newValue);
    }
    
    var tasksCounter = parseInt(localStorage.getItem("todo_counter"));
    var total = 0, accomplished = 0;
    if (tasksCounter == null || isNaN(tasksCounter)) {
        tasksCounter = 0;
        localStorage.setItem("todo_counter", 0);
    } else {
        for (i = 1; i <= tasksCounter; ++i) {
            if (localStorage.getItem(i) != null) {
                var taskObj = JSON.parse(localStorage.getItem(i));
                var isDone = taskObj['done'];
                accomplished += isDone ? 1 : 0;
                total++;
                var taskText = taskObj['text'];
                addTask(taskText, isDone, i);
            }
        }
    }
    updateAccomplished(accomplished);
    updateTotal(total);
    
	// Task deleting
    $(document).on('click', '.delete-task', function (e) {
        console.log("click on delete-task button");
        if ($(this).siblings('input:checked').length != 0) {
            updateAccomplished(getAccomplished() - 1);
        }
		divId = parseInt($(this).parent('.task').attr('id'));
        console.log("divId is " + divId);
        localStorage.removeItem(divId);
        updateTotal(getTotal() - 1);
        $(this).parent().remove();
	});
    
    // Task adding
    function addTask(textValue, done, id) {
        console.log("inside addTask function");
        $tasks = $('#tasks');
        $divToAppend = $('<div class="task" id='+id+'><input type="checkbox"><span>' +
                         textValue + '</span><button class="delete-task">X</button>');
        console.log($divToAppend);
        $tasks.append($divToAppend);
        if (done) {
            $tasks.children().last().find('input:checkbox').first().click();
        }
    }
    
    $('#tasks-adding').submit(function () {
        console.log("tasks-adding form has been submitted");
        var input = $('#task-descr');
        if (input.val() !== "") {
            addTask(input.val(), false, ++tasksCounter);
            localStorage.setItem(tasksCounter, JSON.stringify({text: input.val(), done: false})); 
            localStorage.setItem("todo_counter", tasksCounter);
            input.val("");
            updateTotal(getTotal() + 1);
        }
        return false;
    });
    
    // Line-through and increment accomplished tasks value
    $(document).on('click', '.task>input:checkbox:checked', function () {
        console.log("click on unchecked checkbox");
        $(this).siblings('span').first().css('text-decoration', 'line-through');
        var taskId = $(this).parent().attr('id');
        var oldTaskJSON = JSON.parse(localStorage.getItem(taskId));
        localStorage.setItem(taskId, JSON.stringify({text: oldTaskJSON['text'], done: true}));
        updateAccomplished(getAccomplished() + 1);
    });
    
    // Reverse actions to previous function
    $(document).on('click', '.task>input:checkbox:not(:checked)', function () {
        console.log("click on checked checkbox");
        $(this).siblings('span').first().css('text-decoration', 'none');
        var taskId = $(this).parent().attr('id');
        var oldTaskJSON = JSON.parse(localStorage.getItem(taskId));
        localStorage.setItem(taskId, JSON.stringify({text: oldTaskJSON['text'], done: false}));
        updateAccomplished(getAccomplished() - 1);
    });
    
    // Marking all as done
    $('.mark-all').click(function () {
         $('.task>input:checkbox').click();
    });
    
    // Deleting marked tasks
    $('.delete-marked').click(function () {
        $('.task>input:checked ~ .delete-task').click();
        updateAccomplished(0);
    });
    
    // Task editing
    $('#tasks').on('dblclick', '.task>span', function () {
        console.log("double click on #tasks");
        var $span = $(this);
        var spanText = $span.text();
        var $form = $('<form class="pure-form edition-form">');
        var $input = $('<input type="text">').val(spanText);
        $form.append($input);
        $span
            .text("")
            .append($form);
        $input.select();
    });
    
    var replaceInputWithText = function($form) {
        $input = $form.find('input').first();
        var newText = $input.val();
        var taskId = $form.parent().parent().attr('id');
        var oldTaskJSON = JSON.parse(localStorage.getItem(taskId));
        localStorage.setItem(taskId, JSON.stringify({text: newText, done: oldTaskJSON['done']}));
        $span = $form.parent();
        $form.remove();
        $span.text(newText);
        return false;
    }
    
    $(document).on('submit', 'form[class*=edition-form]', function () {
        replaceInputWithText($(this));
        return false;
    });
    
    $(document).on('click', function(event) {
        console.log("document was clicked");
        if ($('form[class*=edition-form]').length && !$(event.target).closest('form[class*=edition-form]').length) {
            replaceInputWithText($(this).find('form[class*=edition-form]').first());
        }
    });
});
$(() => {
  const taskDict = {};

  function checkAndCreate () {
    const checkAllButton = '<div><button class="check-all-btn" style="margin: 2rem 0 0; border-radius: 7px; position: fixed; bottom: 40px; right: 100px; height: 50px; border: 1px solid #c70035; color: #FFFFFF; background-color: #e0003c;">Check All Tasks</button></div>';
    const checkAllTasksResults = '<div class="check-all-tasks" style="border-radius: 7px; position: fixed; bottom: 100px; right: 40px; height: 40vh; text-align: center;"></div>';
    const checkerAvailable = $(".list-group-item:contains('was')").html();
    const secondChance = $(".list-group-item:contains('second')").html();
    const projectFinished = $(".list-group-item:contains('over')").html();

    // If checker is available, display visual elements
    if (checkerAvailable || secondChance || projectFinished) {
      $(checkAllButton).insertAfter('main');
      $(checkAllTasksResults).insertAfter('main');
    }

    // Additional css for task grid
    $('.check-all-tasks').css({
      'background-color': 'rgb(30, 33, 34)',
      color: 'white',
      width: '175px',
      display: 'grid',
      'grid-template-columns': '100%',
      'grid-template-rows': 'auto',
      'grid-template-areas': '"main"',
      'justify-content': 'center',
      'overflow-y': 'auto'
    });

    $('.grid-header').css('grid-area', 'header');
    $('.grid-main').css('grid-area', 'main');
  }
  // Create the list of tasks and populate the window
  function createTaskList () {
    $("div[id|='task-num']").each(function getAllTaskIDs () {
      const taskNumber = $(this).attr('id').split('-')[2];
      const taskID = $(this).data('role').replace(/\D/g, '');
      taskDict[taskNumber] = taskID;
    });
    for (const [k, v] of Object.entries(taskDict)) {
      const taskCheckString = `<div><p class="grid-main" data-id='${v.toString()}' style="background-color: grey; display: flex; justify-content: center; align-items: center; line-height: 3rem; margin-bottom: 1px !important;"><b>${k.toString()}</b></p></div>`;
      $('.check-all-tasks').append(taskCheckString);
    }
  }

  // Adds click listeners to check a single task
  function addClickListeners () {
    $("button[id$='check-code-btn']").each(function getAllCheckCodeButtons () {
      $(this).one('click', function addListenerToButton () {
        const taskID = $(this).data('task-id').toString();
        const selectorString = `.correction_request_test_send[data-task-id='${taskID}']`;
        const key = Object.keys(taskDict).find(k => taskDict[k] === taskID);

        console.log('taskID: ' + taskID + ' taskNumber: ' + key + ' selectorString ' + $(selectorString).length);
        if ($(selectorString).length > 0) {
          $(selectorString).click();
        }
        checkAndSetColor(taskID);
        $('button.close').click();
      });
    });
  }

  // Recursively waits until elements in a given selector are populated
  function waitForAllEls (selector, callback) {
    if (document.querySelectorAll(selector).length > 0) callback();
    else {
      setTimeout(function () {
        waitForAllEls(selector, callback);
      }, 1000);
    }
  }

  // Checks all tasks at once when button is clicked
  function checkAllTasks () {
    $('.check-all-btn').on('click', function () {
      $("button[id$='check-code-btn']").each(function () {
        $(this).trigger('click');
        $('button.close').trigger('click');
        const taskID = $(this).data('task-id').toString();
        checkAndSetColor(taskID);
      });
    });
  }

  // Waits for checker response and sets task info (color & green/total) accordingly
  function checkAndSetColor (taskID) {
    const failedChecks = [];
    const taskBox = `div.check-all-tasks > div > p[data-id='${taskID}']`;
    const fRMString = `#task-test-correction-${taskID}-correction-modal > div > div > div.modal-body > div.result > div.check-inline`;
    waitForAllEls(fRMString, () => {
      const modalChildren = document.querySelectorAll(fRMString);
      modalChildren.forEach((child) => {
        if (child.className.includes('fail')) failedChecks.push(child);
      });
      if (failedChecks.length > 0) {
        $(taskBox).css('background-color', 'red');
      } else {
        $(taskBox).css('background-color', 'green');
      }
      const greenChecks = modalChildren.length - failedChecks.length;
      const key = Object.keys(taskDict).find(k => taskDict[k] === taskID);

      $(taskBox).html('<b>' + key + '</b>&nbsp;-&nbsp;<small>(' + greenChecks + '/' + modalChildren.length + ')');
      console.log(taskID + ' is done with ' + failedChecks.length + ' red checks over ' + modalChildren.length + ' total checks');
    });
  }

  checkAndCreate();
  createTaskList();
  addClickListeners();
  checkAllTasks();
});

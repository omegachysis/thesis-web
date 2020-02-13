
function getMeetingHtml(meeting) {
  var deliverables = "";
  for (item of meeting.deliverables) {
      deliverables += `<li>${item}</li>`;
  }
  var discussion = "";
  for (item of meeting.discussion) {
      discussion += `<li>${item}</li>`;
  }
  var continuing = "";
  for (item of meeting.continuing) {
      continuing += `<li>${item}</li>`;
  }

  return `
  <h3>${meeting.date}</h3><br />
  <div class="row">
  <div class="col-4">
      <h4><span class="badge badge-pill badge-danger">Deliverables</span></h4>
      <ul>${deliverables}</ul>
    </div>
    <div class="col-4">
      <h4><span class="badge badge-pill badge-success">Discussion</span></h4>
      <ul>${discussion}</ul>
    </div>
    <div class="col-4">
      <h4><span class="badge badge-pill badge-primary">Continuing</span></h4>
      <ul>${continuing}</ul>
    </div>
  </div>`;
}

function getTaskHtml(task) {
  var progress = (task.progress / task.effort) * 100;
  var badgeColor = "badge-light";
  var barColor = "bg-primary";
  var badgeText = "Upcoming";

  if (task.progress == task.effort) {
    badgeColor = "badge-success";
    barColor = "bg-success";
    badgeText = "Completed";
  } else if (taskIsCurrent(task)) {
    badgeColor = "badge-primary";
    barColor = "bg-primary";
    badgeText = "In Progress";
  } else if (Date.now > new Date(task.end)) {
    badgeColor = "badge-danger";
    barColor = "bg-danger";
    badgeText = "Overdue";
  }

  return `
  <div class="row">
    <div class="col-9">
        <h5>${task.text}
            <span class="badge badge-pill ${badgeColor}">${badgeText}</span>
        </h5>
        <a>${task.begin} to ${task.end}</a>
    </div>
    <div class="col-3">
        <h6>Estimated Progress: ${progress.toFixed(0)}%</h6>
        <div class="progress">
            <div class="progress-bar progress-bar-striped ${barColor}" 
            style="width: ${progress}%"></div>
        </div>
    </div>
  </div><br />`;
}

function getOverallProgress(tasks) {
  var progress = 0;
  var total = 0;
  for (task of tasks) {
    progress += task.progress;
    total += task.effort;
  }

  return progress / total;
}

function taskIsCurrent(task) {
  var begin = new Date(task.begin);
  if (Date.now() >= begin) {
      var end = new Date(task.end);
      if (Date.now() <= end) {
          return true;
      }
  }

  return false;
}

particlesJS("particles-js", 
{
  "particles": {
    "number": {
      "value": 80,
      "density": {
        "enable": false,
        "value_area": 2600
      }
    },
    "color": {
      "value": "#000000"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
    },
    "opacity": {
      "value": 1,
      "random": true,
      "anim": {
        "enable": true,
        "speed": 1,
        "opacity_min": 0,
        "sync": false
      }
    },
    "size": {
      "value": 5,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 4,
        "size_min": 0.3,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 300,
      "color": "#000000",
      "opacity": 0.5,
      "width": 3
    },
    "move": {
      "enable": true,
      "speed": 1.2,
      "direction": "none",
      "random": true,
      "straight": false,
      "out_mode": "bounce",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 600
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": false,
        "mode": "grab"
      },
      "onclick": {
        "enable": false,
        "mode": "repulse"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 400,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 250,
        "size": 0,
        "duration": 2,
        "opacity": 0,
        "speed": 3
      },
      "repulse": {
        "distance": 400,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
});
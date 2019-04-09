function createTag(tag, attrs) {
    var t = document.createElement(tag);
    for (k in attrs) {
        t.setAttribute(k, attrs[k]);
    }
    return t;
}

function container(selector) {
    return document.querySelector(selector);
}

function jobs(selector) {
    var url = "https://feeds.420cloud.com/jobs";

    var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest; //Hack for IE8,9: XDomainRequest
    var xhr = new XHR();

    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            console.log(data);
            container(selector).innerHTML = "";
            data["data"].forEach(function (e) {

                var li = createTag("li", {class: "jobs-item"});
                var div = createTag("div", {class: "jobs-div"});
                var title = createTag("h2", {class: "jobs-title"});
                var jobType = createTag("span", {class: "jobs-type"});
                var jobCompany = createTag("span", {class: "jobs-company"});
                var jobState = createTag("span", {class: "jobs-state"});
                var jobSalary = createTag("span", {class: "jobs-salary"});
                var jobInfo = createTag("div", {class: "jobs-info"});
                var pic = createTag("img", {
                    alt: e.title,
                    src: e.picture,
                    class: "jobs-img",
                    width: "50",
                    height: "50"
                });

                container(selector).appendChild(li);
                li.appendChild(div);
                div.appendChild(jobType).innerHTML = e.type;
                div.appendChild(title).innerHTML = e.title;
                div.appendChild(pic);
                div.appendChild(jobCompany).innerHTML = '<b>Company:</b> ' + e.company;
                div.appendChild(jobState).innerHTML = '<b>State:</b> ' + e.loc_country + ' ' + e.loc_state + ' ' + e.loc_city;
                div.appendChild(jobSalary).innerHTML = '<b>Salary:</b> $' + e.salary + ' / hour';
                div.appendChild(jobInfo).innerHTML = (e.details == null) ? '' : e.details.substr(0, 110) + '...';

                var emptyImg = 'http://placehold.it/50x50'; // If empty or error image
                var validateImg = function (openImg) {
                    img = new Image();
                    img.onerror = function () {
                        openImg.src = emptyImg;
                    };
                    img.src = openImg.src;
                };
                var image = document.getElementsByTagName('img');
                var i = image.length;
                while (--i !== -1) {
                    validateImg(image[i]);
                }
            });
        }
    };
    xhr.open("GET", url, true);
    xhr.send();
}

var footer = '<table width="100%"><tr><td><span id="footer-links">' + '<a target="_blank" href="http://www.utah.edu/">© 2014 The University of Utah</a>' + '<a target="_blank" href="http://tlt.utah.edu/">Teaching and Learning Technologies</a>' + '<a target="_blank" href="https://uonline.utah.edu/">UOnline</a>' + '<a href="#" onclick="return false;">801.581.6112</a>' + '<a target="_blank" href="http://www.utah.edu/disclaimer/index.html">Disclaimer</a>' + '<a target="_blank" href="http://www.utah.edu/privacy/">Privacy</a>' + '</span></td>' + '<td style="text-align:right;"><a target="_blank" href="http://www.instructure.com"><img src="/images/footer-logo.png?1303834440"></a></td>' + '</tr></table>';

$('#footer').html(footer);
$('input[id="build_pseudonym_for_email"]').hide();
$('label[for="build_pseudonym_for_email"]').hide();

$('div[id="login_form"]').html('<a class="button" style="font-size: 1.3em;" href="/login">uNID Log in at The University of Utah</a><p></p><a class="button" style="font-size: 1.3em;" href="/login?canvas_login=1">Guest (non uNID) Log in</a>');

// [purpose: "script to modify filmstrip icon of old version of Kaltura tool", effective_date: "August-29, 2014", modifier: "Jihoon Yoo"]
function setKalturaIcon() {
    console.log(new Date() + ": finding Kaltura old icon ... " +  $('span.mceIcon.mce_instructure_record').length);
    $('span.mceIcon.mce_instructure_record').html('<img class="mceIcon" src="https://utah.test.instructure.com/images/webcam.png" alt="Record/Upload Media">');
}    
setTimeout(function(){ setKalturaIcon() }, 1300);
         
var is_updated = false;
$(document).click(function() {
    if ($('#create-users-step-1') != null) {
        $('#create-users-step-1>p').text("Type or paste a list of University of Utah IDs below.  You may use email addresses to add a user as guest if user doesn't have a Unid.");
        $('.content-box>textarea').attr('placeholder', "ex: u0000000, or nonutahuser@somemail.com");
    }
    if (document.getElementById("help-dialog") != null && !is_updated) {
        // $('.help_dialog_trigger').html($('#header .user_id').text());
        //  alert('modifying ticket form...');
        is_updated = true;
        $('label[for="error_subject"]').html('Subject <b style="font-size:75%;color:red;">*required</b>');
        $('label[for="error-comments"]').html('Description <b style="font-size:75%;color:red;">**required</b>');

        var form = $('#create_ticket');
        form.append('<input type="hidden" name="user_id" value="' + $('#header .user_id').text() + '">');
        form.append('<input type="reset" value="Reset" style="display:none">');
        form.removeAttr('action');
        form.unbind('submit');
        form.bind('submit', function(e) {
            e.preventDefault();
            var subject = $('input[name="error[subject]"]').val().trim();
            var comment = $('textarea[name="error[comments]"]').val().trim();

            if (subject.length == 0) alert('Please provide a subject.');
            else if (comment.length == 0) alert('Please provide a description.');
            else {
                $.post('https://uonline.utah.edu/zendesk/feedback/add', form.serialize());
                setTimeout(function() {
                    alert("A ticket has been submitted to TLT.\n\nThank you for your time.");
                    $('input[type="reset"]').click();
                    $('.ui-dialog-titlebar-close').click();
                }, 1000);
            }
            return false;
        });
    }
    setTimeout(function(){ setKalturaIcon() }, 1004);
});

/*jslint browser: true, sloppy: false, eqeq: false, vars: false, maxerr: 50, indent: 4, plusplus: true */
/*global $, jQuery, alert, console */

// These tools were designed to facilitate rapid course development in the Canvas LMS
// Copyright (C) 2014  Kenneth Larsen - Center for Innovative Design and Instruction
// Utah State University

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
// http://www.gnu.org/licenses/agpl-3.0.html

///////////////////////////////////
// Kenneth's Custom Canvas Tools //
///////////////////////////////////
// Path to where the canvasCustomTools folder is located
var klToolsPath = "https://uonline.utah.edu:8443/kennethware2/",
    globalCSSPath = "https://uonline.utah.edu/canvas/uofu_overrides.css",
    klFontAwesomePath = "//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css";


	console.log('canvasGlobal.js loading');
    //Parse Course Number - It is stored in the variable "coursenum"//
var coursenum, matches, killspot;
coursenum = null;
matches = location.pathname.match(/\/courses\/(.*)/);
if (matches) {
    coursenum = matches[1];
    killspot = coursenum.indexOf("/", 0);
    if (killspot >= 0) {
        coursenum = coursenum.slice(0, killspot);
    }
}


(function () {
    'use strict';
    // Get Current Users Canvas ID
    var userID = $(".user_id").text(),

        // Comma seperated list of courses to allow custom tools access
        // Any user who edits a page in this course will have the tools
        courseArray = [
            "", // Allowed course Canvas ID
            "" // Another allowed course Canvas ID
        ],
        // Comma seperated list of user Canvas ID's to allow custom tools access
        // Tools can be used in any course this user edits
        userArray = [
            "281843",     	// Jon Thomas
            "283127",		// Eric Pasion
			"139849",		// NATHAN SANDERS
			"200712",       // PAUL BURROWS
			"96239",		// QIN LI
			"52197", 		// CECILE PASKETT
			"52952", 		// JANE WOLFARTH
			"1241434", 		// CARLOS ALARCO 
        	"6"				// Jihoon
        ],
     	timestamp =  +(new Date());

    // Only Allow tool access if course or user is one of the arrays above
    if ($.inArray(coursenum, courseArray) !== -1 || $.inArray(userID, userArray) !== -1) {
	    // Identify if editing a wiki-page
	    setTimeout(function () {
	        if ($('.new_page').length > 0 || ($('#editor_tabs').length > 0 && $('.edit_link').length === 0)) {
	            // Include Font-Awesome icons
	            $("head").append($("<link/>", { rel: "stylesheet", href: klFontAwesomePath, type: 'text/css'}));
	            // Load tools js
	            $.getScript(klToolsPath + "js/tools_variables.js", function () {
	                console.log("tools_variables loaded");
	            });
	            $.getScript(klToolsPath + "js/tools_main.js", function () {
	                console.log("tools_main loaded");
	            });
	            // Spectrum color picker
	            $.getScript(klToolsPath + "js/spectrum.js", function () {
	                console.log("spectrum loaded");
	            });
	            $("head").append($("<link/>", { rel: "stylesheet", href: klToolsPath + "css/spectrum.css?" + timestamp }));
	        }
	        // Live view for tools
	        if ($('#kl_wrapper').length > 0) {
	            $.getScript(klToolsPath + "/js/tools_liveView.js", function () {
	                console.log("tools_liveView.js Loaded.");
	            });
	        }

	    }, 1000);
	}
    setTimeout(function () {
        // Front Page Custom banner image
        if ($("#kl_banner_image").length > 0) {
            $('head').prepend('<style>#kl_banner_image {background: url(/courses/' + coursenum + '/file_contents/course%20files/global/css/images/homePageBanner.jpg) no-repeat center center; }</style>');
        }
        if ($("#usu-home-img").length > 0) {
            $('head').prepend('<style>#usu-home-img {background: url(/courses/' + coursenum + '/file_contents/course%20files/global/css/images/homePageBanner.jpg) no-repeat center center; }</style>');
        }
    }, 1000);

    // add css for font-awesome if a course is using any of their icons
    if ($(".fa").length > 0) {
        $("head").append($("<link/>", { rel: "stylesheet", href: klFontAwesomePath, type: 'text/css' }));
    }

    // The following provides the tooltip instructions for updating grade scheme
    function getURLParameter(name) {
        return decodeURI(
            (new RegExp(name + '=' + '(.+?)(&|$)').exec(location.search) || [null])[1]
        );
    }
    // Step by step instructions for creating grading scheme
    (function () {
        var task = getURLParameter("task");
        if (task === "setGradeScheme") {
            console.log('Show how to set grade scheme');
            setTimeout(function () {
                $(".edit_course_link").get(0).scrollIntoView();
                $("#course_details_tabs").tabs("option", "active", 0);
                $(".edit_course_link").attr({"data-tooltip": "top", "title": "Click Here"}).trigger('mouseenter').click(function () {
                    setTimeout(function () {
                        $(".grading_standard_checkbox").get(0).scrollIntoView();
                        $(".grading_standard_checkbox").attr({"data-tooltip": "top", "title": "Check this box"}).trigger('mouseenter').change(function () {
                            setTimeout(function () {
                                $(".edit_letter_grades_link").attr({"data-tooltip": "top", "title": "Click this link"}).trigger('mouseenter').click(function () {
                                    setTimeout(function () {
                                        $(".edit_grading_standard_link").attr({"data-tooltip": "top", "title": "Click this link if you want to make changes."}).trigger('mouseenter');
                                        $(".display_grading_standard .done_button").attr({"data-tooltip": "top", "title": "When you are finished, click here."}).trigger('mouseenter').click(function () {
                                            $(".edit_letter_grades_link").trigger("mouseout");
                                            $(".edit_grading_standard_link").trigger("mouseout");
                                            setTimeout(function () {
                                                $(".coursesettings .form-actions .btn-primary").get(0).scrollIntoView();
                                                $(".coursesettings .form-actions .btn-primary").attr({"data-tooltip": "top", "title": "<strong>Next Steps:</strong><ol style='text-align:left;'><li>Click this button to save changes.</li><li>Wait for the page to save.</li><li>Close this tab.</li></ol>"}).trigger('mouseenter');
                                            }, 600);
                                        });
                                    }, 600);
                                });
                            }, 600);
                        });
                    }, 600);
                });
            }, 1000);
        }
    }());
}());
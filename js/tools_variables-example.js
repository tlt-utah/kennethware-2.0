/*jslint browser: true, sloppy: false, eqeq: false, vars: false, maxerr: 50, indent: 4, plusplus: true */
/*global $, jQuery, alert, console, coursenum, klToolsPath */

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

var klToolsVariables = {

// //////////////////////
// // OPTIONAL LIMITS  //
// //////////////////////

    // OPTIONAL: Limit tools loading by users roll
    klLimitByRole: false,
    // Change klLimitByRole to "true" to limit to rolls in the klRoleArray array
    // adjust roles as needed
    klRoleArray: [
        'student',
        'teacher',
        'admin'
    ],
    // OPTIONAL: Limit tools to an array of Canvas user IDs
    klLimitByUser: false,
    // Change klLimitByUser to "true" to limit to users in the klUserArray array
    // klUserArray is the Canvas user ID not the SIS user ID
    klUserArray: [
        '1234',
        '987654'
    ],

//////////////////////
// THEMES           //
//////////////////////

    // To add a theme, add the class here and add a thumbnail to the <toolspath>/images/template_thumbs folder 
    // Frontpage thumbnails approx 225px X 106px
    klFrontPageThemeArray: [
        'kl_fp_horizontal_nav_2',
        'kl_fp_panel_nav_2',
        'kl_fp_squares_1x1',
        'kl_fp_flat_sections',
        'kl_fp_colored_headings',
        'kl_fp_circles_1x1'
    ],
    // To add a theme, add the class here and add a thumbnail to the <toolspath>/images/template_thumbs folder 
    // WikiPage thumbnails approx 116px x 116px
    // Themes without a description div
    klPagesThemeArray: [
        'kl_generic',
        'kl_basic_color',
        'kl_bookmark',
        'kl_apple',
        'kl_basic_bar',
        'kl_flat_sections',
        'kl_colored_headings',
        'kl_box_left',
        'kl_box_left_2',
        'kl_box_left_3',
        'kl_square_right',
        'kl_square_right_2',
        'kl_square_right_3',
        'kl_rounded_inset',
        'kl_rounded_inset_2',
        'kl_rounded_inset_3',
        'kl_circle_left',
        'kl_circle_left_2',
        'kl_circle_left_3'
    ],
    // The templates in this list will match the Canvas background color
    klMatchCanvasBackgroundTemplates: [
        'kl_colored_headings',
        'kl_fp_colored_headings'
    ],
    // Templates in this list will not hide the Canvas page title by default
    klShowPageTitleTemplates: [
        'kl_basic_bar'
    ],
    // Themes with a bottom banner div (includes subtitle and description)
    // To add a theme, add the class here and add a thumbnail to the <toolspath>/images/template_thumbs folder 
    klBottomBannerPagesThemeArray: ['kl_emta'],

    // Colors included in this array will be included as swatches in the colorpicker
    klThemeColors: [
        ['#003366', '#AC8D73', '#A4AEB5', '#0F2439'],
        ['#000', '#444', '#666', '#999', '#ccc', '#eee', '#f3f3f3', '#fff'],
        ['#f4cccc', '#fce5cd', '#fff2cc', '#d9ead3', '#d0e0e3', '#cfe2f3', '#d9d2e9', '#ead1dc'],
        ['#ea9999', '#f9cb9c', '#ffe599', '#b6d7a8', '#a2c4c9', '#9fc5e8', '#b4a7d6', '#d5a6bd'],
        ['#e06666', '#f6b26b', '#ffd966', '#93c47d', '#76a5af', '#6fa8dc', '#8e7cc3', '#c27ba0'],
        ['#c00', '#e69138', '#f1c232', '#6aa84f', '#45818e', '#3d85c6', '#674ea7', '#a64d79'],
        ['#900', '#b45f06', '#bf9000', '#38761d', '#134f5c', '#0b5394', '#351c75', '#741b47'],
        ['#600', '#783f04', '#7f6000', '#274e13', '#0c343d', '#073763', '#20124d', '#4c1130']
    ],
    // Do you want additional outcomes in the syllabus tools
    klUseAdditionalOutcomes: true,
    // Title for button and dialog box
    klUseAdditionalOutcomesTitle: 'IDEA Objectives',
    // Outcomes: The text within the .kl_additional_outcome_text span will be inserted, text outside that span is for display purposes only
    klAdditionalOutcomes: [
        '<span class="kl_additional_outcome_text">Gaining factual knowledge (terminology, classifications, methods, trends)</span> - IDEA Objective 1</a></li>',
        '<span class="kl_additional_outcome_text">Learning fundamental principles, generalizations, or theories</span> - IDEA Objective 2</a></li>',
        '<span class="kl_additional_outcome_text">Learning to Apply Course Material (to improve thinking, problem solving, and decisions)</span> - IDEA Objective 3</a></li>',
        '<span class="kl_additional_outcome_text">Developing specific skills, competencies, and points of view needed by professionals in the field most closely related to this course</span> - IDEA Objective 4</a></li>',
        '<span class="kl_additional_outcome_text">Acquiring skills in working with others as a member of a team</span> - IDEA Objective 5</a></li>',
        '<span class="kl_additional_outcome_text">Developing creative capacities (writing, inventing, designing, performing in art, music, drama, etc.)</span> - IDEA Objective 6</a></li>',
        '<span class="kl_additional_outcome_text">Gaining a broader understanding and appreciation of intellectual/cultural activity</span> - IDEA Objective 7</a></li>',
        '<span class="kl_additional_outcome_text">Developing skill in expressing myself orally or in writing</span> - IDEA Objective 8</a></li>',
        '<span class="kl_additional_outcome_text">Learning how to find and use resources for answering questions or solving problems</span> - IDEA Objective 9</a></li>',
        '<span class="kl_additional_outcome_text">Developing a clearer understanding of, and commitment to, personal values</span> - IDEA Objective 10</a></li>',
        '<span class="kl_additional_outcome_text">Learning to analyze and critically evaluate ideas, arguments, and points of view</span> - IDEA Objective 11</a></li>',
        '<span class="kl_additional_outcome_text">Acquiring an interest in learning more by asking questions and seeking answers</span> - IDEA Objective 12</a></li>'

    ],
    // To show Canvas styles in the editor, check the following against the stylesheets loaded in the head of a Canvas page
    // You may need to update the numbers at the end
    vendor_legacy_normal_contrast: '/assets/vendor_legacy_normal_contrast.css?1408316217',
    common_legacy_normal_contrast: '/assets/common_legacy_normal_contrast.css?1408316151',

    // Institutional policies and procedures need to be included in a Canvas course with a page named "Policies and Procedures" include the Canvas course ID here
    klToolTemplatesCourseID: '343656',

    // The following is the default template code for the template sections you can change icons or other aspects but do not change div ID's
    // To add a new section, set the variable with the html content and then add it to the array of section names
    // Base html variables for sections  //
    klPagesBanner: '<div id="kl_banner"><h2><span id="kl_banner_left"><span class="kl_mod_text">Text </span><span class="kl_mod_num">## </span>' +
        '    </span>' +
        '    <span id="kl_banner_right">' +
        '        Title' +
        '    </span></h2>' +
        '    </div>',
    klPagesBottomBanner: '<div id="kl_banner_bottom">' +
        '<h3>Subtitle</h3>' +
        '<div id="kl_description">' +
        '    Description' +
        '</div>' +
        '</div>',
    klPagesBannerImage: '<div id="kl_banner_image"><img class="kl_image_full_width" style="width: 100%; height: auto; max-width: 100%;" src="https://elearn.usu.edu/canvas_branding/css/images/homePageBanner.jpg" alt="home page banner" /></div>',
    klPagesNavSection: '<div id="kl_navigation">' +
        '<ul>' +
        '    <li><a class="icon-forward" title="start here" href="/courses/' + coursenum + '/pages/start-here">Start Here</a></li>' +
        '    <li><a class="icon-syllabus" title="syllabus" href="/courses/' + coursenum + '/assignments/syllabus">Syllabus</a></li>' +
        '    <li><a class="icon-module" title="modules" href="/courses/' + coursenum + '/modules">Modules</a></li>' +
        '    <li><a class="icon-add" title="more resources" href="/courses/' + coursenum + '/pages/more-resources">More Resources</a></li>' +
        '</ul>' +
        '</div>',
    klPagesIntroductionSection: '<div id="kl_introduction">' +
        '   <p>Add some introductory text to discuss this module</p>' +
        '</div>',
    klPagesObjectiveSection: '<div id="kl_objectives">' +
        '   <h3 class="icon-rubric-dark">Objectives</h3>' +
        '   <ol id="kl_objective_list">' +
        '       <li>Describe this</li>' +
        '       <li>Define that</li>' +
        '       <li>Identify this</li>' +
        '   </ol>' +
        '</div>',
    klPagesReadingsSection: '<div id="kl_readings">' +
        '   <h3 class="icon-document">Readings</h3>' +
        '   <ol>' +
        '       <li>Reading 1</li>' +
        '       <li>Reading 2</li>' +
        '   </ol>' +
        '</div>',
    klPagesLectureSection: '<div id="kl_lectures">' +
        '   <h3 class="icon-video">Lectures</h3>' +
        '   <p>[Insert video(s) here]</p>' +
        '</div>',
    klPagesActivitySection: '<div id="kl_activities">' +
        '   <h3 class="icon-standards">Activities</h3>' +
        '   <ul>' +
        '       <li>Discuss the following</li>' +
        '       <li>Submit the following</li>' +
        '       <li>Quiz</li>' +
        '   </ul>' +
        '</div>',
    klPagesAssignmentSection: '<div id="kl_assignments">' +
        '   <h3 class="icon-assignment">Assignments</h3>' +
        '   <p>Assignment Description</p>' +
        '</div>',
    klPagesAttributionSection: '<div id="kl_image_attribution">Image attribution here.</div>',
    klPagesModulesSection: '<div id="kl_modules">&nbsp;</div>',
    klPagesFooterSection: '<div id="kl_contact_footer">' +
        '   First Last, Ph.D. &nbsp;| ' +
        '   &nbsp;first.last@usu.edu&nbsp; | ' +
        '   &nbsp;Department<br />' +
        '   <span class="usu-copyright">Materials in this course may be copyright protected. Please do not distribute them without permission of the copyright holder.</span>' +
        '</div>',
    klPagesSocialMediaSection: '<div id="kl_social_media">&nbsp;</div>',

    ////////// Syllabus Sections HTML //////////
    //// Contact Information ////
    klSyllabusInformation: '<div id="kl_syllabus_information">' +
        '   <p>Course Title | Term Year</p>' +
        '   <h3>CONTACT INFORMATION</h3>' +
        '</div>',
    // Instructor
    klSyllabusInstructors: '<div class="kl_syllabus_instructors" style="margin-left:10px;">' +
        '   <h4>Instructor</h4>' +
        '   <ul style="list-style-type: none;">' +
        '       <li>Teacher Name</li>' +
        '       <li>797-1000</li>' +
        '       <li>teacher@usu.edu</li>' +
        '   </ul>' +
        '   <h5>Office Hours</h5>' +
        '   <p>List hours</p>' +
        '</div>',
    klSyllabusAdditionalInstructor: '<div class="kl_syllabus_additional_instructor"><h4>Instructor</h4>' +
        '   <ul style="list-style-type: none;">' +
        '       <li>Teacher Name</li>' +
        '       <li>797-1000</li>' +
        '       <li>teacher@usu.edu</li>' +
        '   </ul>' +
        '   <h5>Office Hours</h5>' +
        '   <p>List hours</p>' +
        '</div>',
    // Teacher Assistant
    klSyllabusTeachingAssistants: '<div class="kl_syllabus_teaching_assistant" style="margin-left:10px;"><h4>Teaching Assistant</h4>' +
        '   <ul style="list-style-type: none;">' +
        '       <li>TA Name</li>' +
        '       <li>ta@usu.edu</li>' +
        '   </ul>' +
        '</div>',
    klSyllabusAdditionalTeachingAssistant: '<div class="kl_syllabus_additional_teaching_assistant"><h4>Teaching Assistant</h4>' +
        '   <ul style="list-style-type: none;">' +
        '       <li>TA Name</li>' +
        '       <li>ta@usu.edu</li>' +
        '   </ul>' +
        '</div>',
    // Course Description
    klSyllabusCourseDescription: '<div class="kl_syllabus_course_description" style="margin-left:10px;">' +
        '   <h4>Course Description</h4>' +
        '   <p>Text</p>' +
        '</div>',

    //// Learning Outcomes ////
    klSyllabusOutcomes: '<div id="kl_syllabus_outcomes">' +
        '   <h3>LEARNING OUTCOMES</h3>' +
        '</div>',
    // Course Outcomes
    klSyllabusLearningOutcomes: '<div class="kl_syllabus_learning_outcomes" style="margin-left:10px;">' +
        '   <h4>Outcomes</h4>' +
        '   <p>Upon completion of this course you will be able to:</p>' +
        '   <ul>' +
        '       <li>Outcome text here.</li>' +
        '   </ul>' +
        '</div>',

    //// Course Resources ////
    klSyllabusResources: '<div id="kl_syllabus_resources">' +
        '   <h3>LEARNING RESOURCES</h3>' +
        '</div>',
    // Course Tech Requirements
    klSyllabusCanvasInfo: '<div class="kl_syllabus_canvas_info" style="margin-left:10px;">' +
        '   <h4>Canvas</h4>' +
        '   <p>Canvas is the where course content, grades, and communication will reside for this course.</p>' +
        '   <ul>' +
        '       <li><a class="external" href="http://canvas.usu.edu/" target="_blank">http://canvas.usu.edu</a></li>' +
        '       <ul>' +
        '           <li>Your <strong>username</strong> is your <strong>A#</strong>, and your <strong>password</strong> is your global password (the same one you use for Banner or Aggiemail).</li>' +
        '       </ul>' +
        '       <li>For <a class="external" href="http://canvas.usu.edu/" target="_blank">Canvas</a>,' +
        '           <a class="external" href="https://id.usu.edu/Password/Help/#password" target="_blank">Passwords</a>,' +
        '           or any other computer-related technical support contact the <a class="external" href="http://it.usu.edu/" target="_blank">IT Service Desk</a>.</li>' +
        '       <ul>' +
        '           <li>435 797-4357 (797-HELP)</li>' +
        '           <li>877 878-8325</li>' +
        '           <li><a class="external" href="http://it.usu.edu/" target="_blank">http://it.usu.edu</a></li>' +
        '           <li><a href="mailto:servicedesk@usu.edu">servicedesk@usu.edu</a></li>' +
        '       </ul>' +
        '   </ul>' +
        '</div>',
    // Course Software
    klSyllabusCourseSoftware: '<div class="kl_syllabus_software" style="margin-left:10px;">' +
        '   <h4>Software</h4>' +
        '   <p>Text</p>' +
        '</div>',
    // Textbook
    klSyllabusCourseText: '<div class="kl_syllabus_textbook_readings" style="margin-left:10px;">' +
        '   <h4>Textbook & Reading Materials</h4>' +
        '   <p>The text for this class will be' +
        '       The Course Syllabus: A Learning-Centered Approach by O&rsquo;brein, Millis &amp; Cohen, second edition, published by Jossey-Bass, ISDN#047019617.&nbsp;<br />' +
        '       You may purchase this book at the' +
        '       <a class="external" href="http://campusstore.usu.edu/" target="_blank">USU bookstore</a>&nbsp;or online.' +
        '       Make sure you get the second edition!</p>' +
        '</div>',
    // Presentations
    klSyllabusCourseVideos: '<div class="kl_syllabus_videos" style="margin-left:10px;">' +
        '   <h4>Videos</h4>' +
        '   <p>Text</p>' +
        '</div>',

    //// Course Activities ////
    klSyllabusActivities: '<div id="kl_syllabus_activities">' +
        '   <h3>LEARNING ACTIVITIES</h3>' +
        '</div>',
    // Course Readings
    klSyllabusCourseReadings: '<div class="kl_syllabus_activities_readings" style="margin-left:10px;">' +
        '   <h4>Readings</h4>' +
        '   <p>Text</p>' +
        '</div>',
    // Presentations
    klSyllabusVideoActivities: '<div class="kl_syllabus_activities_videos" style="margin-left:10px;">' +
        '   <h4>Videos</h4>' +
        '   <p>Text</p>' +
        '</div>',
    // Labs
    klSyllabusCourseLabs: '<div class="kl_syllabus_labs" style="margin-left:10px;">' +
        '   <h4>Labs</h4>' +
        '   <p>Register for CRN: #####.' +
        '       It is a weekly lab that will allow you to apply what you learn in class.</p>' +
        '</div>',
    // Discussions
    klSyllabusCourseDiscussions: '<div class="kl_syllabus_discussions" style="margin-left:10px;">' +
        '   <h4>Discussions</h4>' +
        '<p>Text</p></div>',
    // Assignments
    klSyllabusCourseAssignments: '<div class="kl_syllabus_assignments" style="margin-left:10px;">' +
        '   <h4>Assignments</h4>' +
        '   <p>Text</p>' +
        '</div>',
    // Quizzes
    klSyllabusCourseQuizzes: '<div class="kl_syllabus_quizzes" style="margin-left:10px;">' +
        '   <h4>Quizzes</h4>' +
        '   <p>Text</p>' +
        '</div>',
    // Exams
    klSyllabusCourseExams: '<div class="kl_syllabus_exams" style="margin-left:10px;">' +
        '   <h4>Exams</h4>' +
        '   <p>Text</p>' +
        '</div>',

    //// Syllabus Policies 
    klSyllabusPolicies: '<div id="kl_syllabus_policies">' +
        '   <h3>COURSE POLICIES</h3>' +
        '</div>',
    // Set notification preferences
    klSyllabusNotificationPreferences: '<div class="kl_syllabus_notification_preferences" style="margin-left:10px;">' +
        '   <h4>Canvas Notification Preferences</h4>' +
        '   <p>Please make sure your Canvas notification preferences are set so that you will receive course announcments <a href="/profile/communication?task=announcements_asap" target="_blank">ASAP</a> or <a href="/profile/communication?task=announcements_daily" target="_blank">Daily</a> <em>(click the appropriate link to set your preference)</em>.</p>' +
        '</div>',
    // Instructor Feedback/communication
    klSyllabusCourseInstructorFeedback: '<div class="kl_syllabus_instructor_feedback" style="margin-left:10px;">' +
        '   <h4>Instructor Feedback/Communication</h4>' +
        '   <p>Text</p>' +
        '</div>',
    // Student Feedback/communication
    klSyllabusCourseStudentFeedback: '<div class="kl_syllabus_student_feedback" style="margin-left:10px;">' +
        '   <h4>Student Feedback/Communication</h4>' +
        '   <p>Text</p>' +
        '</div>',
    // Syllabus Changes
    klSyllabusCoursesSyllabusChanges: '<div class="kl_syllabus_syllabus_changes" style="margin-left:10px;">' +
        '   <h4>Syllabus Changes</h4>' +
        '   <p>This syllabus is subject to change. I will notify the class regarding all changes.' +
        '       In the event of any discrepancy between this syllabus and content found in Canvas,' +
        '       the information in&nbsp;<strong>CANVAS WILL TAKE PRECENDENCE</strong>.</p>' +
        '</div>',
    // Submitting Electronic Files
    klSyllabusCourseSubmitFiles: '<div class="kl_syllabus_submitting_files" style="margin-left:10px;">' +
        '   <h4>Submitting Electronic Files</h4>' +
        '   <p>All electronic files must be submitted in word(.doc, .docx) or rich text file (.rtf) format, unless otherwise stated.' +
        '       Please name your file in the using the following convention:&nbsp;<em>Assignmentname_Yourname.doc</em>.</p>' +
        '</div>',
    // Course Fees
    klSyllabusCourseFees: '<div class="kl_syllabus_course_fees" style="margin-left:10px;">' +
        '   <h4>Course Fees</h4>' +
        '   <p>There are no course fees associated with this course.</p>' +
        '</div>',
    // Late Work
    klSyllabusCourseLateWork: '<div class="kl_syllabus_late_work" style="margin-left:10px;">' +
        '   <h4>Late Work</h4>' +
        '   <p>Late work due to procrastination will not be accepted. Late work due to legitimate emergency may be accepted.' +
        '       The due date and time associated with each quiz, discussion, exam and assignment are stated clearly in Canvas.</p>' +
        '   <p>&nbsp;</p>' +
        '</div>',

    //// Course Grading ////
    klSyllabusGrades: '<div id="kl_syllabus_grades">' +
        '<h3>GRADES</h3>' +
        '   <p>Your grade is based on the following:</p>' +
        '</div>',
    // Course Assignments
    klSyllabusCourseComponents: '<div class="kl_syllabus_course_assignments" style="margin-left:10px;">' +
        '   <h4>Course Assignments</h4>' +
        '</div>',
    // Grade Percentage Scheme Points
    klSyllabusCourseGradeScheme: '<div class="kl_syllabus_grade_scheme" style="margin-left:10px;">' +
        '   <h4>Grading Scheme</h4>' +
        '   <div id="kl_syllabus_canvas_grade_scheme">&nbsp;</div>' +
        '</div>',

    klStartHereContent: '<div id="kl_wrapper" class="kl_box_left">' +
        '   <div id="kl_banner">' +
        '       <h2><span id="kl_banner_left"> <span class="kl_mod_text">Start Here: </span></span><span id="kl_banner_right">Welcome to the Course</span></h2>' +
        '   </div>' +
        '   <div id="Welcome_Letter">' +
        '       <div id="" style="width: 150px; height: 186px; float: right; margin: 5px 0 10px 10px; border: 1px solid #000; overflow: hidden;"><span style="display: block; margin: 10px;">Instructor Photo Goes Here</span></div>' +
        '       <p>Text of letter. Introduce yourself, describe how you got into this field and why you teach this class. Give a little insight as to why this course is important.' +
        '       Let the student know you are a human being invested in the course and in the student&ldquo;s success and get the student as excited as the student will permit himself or herself to be.</p>' +
        '       <p>First Last</p>' +
        '       <p>First M. Last, Ph.D.<br />435-797-XXXX' +
        '           | first.last@usu.edu' +
        '           | website<br /><span style="font-size: 13px; line-height: 1.5;">Department<br /></span><span style="font-size: 13px; line-height: 1.5;">UMC Old Main Hill, Logan, UT 84322</span></p>' +
        '       <br />' +
        '       <p>&nbsp;</p>' +
        '       <p><em>Now, please follow the steps below to continue your orientation to this course.</em></p>' +
        '   </div>' +
        '   <div id="Step_1">' +
        '       <h3 class="icon-document">Step 1: Read the course syllabus and course schedule</h3>' +
        '       <p>The <a title="course syllabus" href="/courses/' + coursenum + '/assignments/syllabus">course syllabus</a>' +
        '           will provide you with the course schedule, course objectives, explanations of assignments and assessments, grading policies, and instructor contact information.' +
        '           Please read it carefully. You should have a deep familiarity with the schedule and process of the course.</p>' +
        '   </div>' +
        '   <div id="Step_2">' +
        '       <h3 class="icon-materials-required">Step 2: Purchase your textbooks</h3>' +
        '       <p>Your textbooks include:</p>' +
        '       <ul>' +
        '       <li>Author (Year).&nbsp;<em>Title.</em>&nbsp;Location: Publisher [ISBN]</li>' +
        '       <li>Author (Year).&nbsp;<em>Title.</em>&nbsp;Location: Publisher [ISBN]</li>' +
        '       <li>Author (Year).&nbsp;<em>Title.</em>&nbsp;Location: Publisher [ISBN]</li>' +
        '       </ul>' +
        '   </div>' +
        '   <div id="Step_3">' +
        '       <h3 class="icon-search-address-book">Step 3: Library information and student support</h3>' +
        '       <p>Visit the <a href="http://library.usu.edu/">library website</a> to learn <a href="http://distance.usu.edu/orientation/library/">what services are provided for online students</a>.</p>' +
        '   </div>' +
        '   <div id="Step_4">' +
        '       <h3 class="icon-settings">Step 4: Read the technical requirements page</h3>' +
        '       <p>The <a href="http://guides.instructure.com/s/2204/m/4214/l/41056-which-browsers-does-canvas-support" target="_blank">Technical Requirements</a> page identifies the browsers, operating systems, and plugins that work best with Canvas.' +
        '       If you are new to Canvas quickly review the <a href="https://training.instructure.com/courses/347469/" target="_blank">Canvas Student Orientation</a> materials.</p>' +
        '   </div>' +
        '   <div id="Step_5">' +
        '       <h3 class="icon-info">Step 5: Read about academic integrity and netiquette</h3>' +
        '       <p>All students at Utah State University agree on admission to abide by the university <em>Honor Code</em>.' +
        '       Please review this <a title="Honor Pledge" href="/courses/172956/pages/honor-pledge" target="_blank">Academic Integrity</a> tutorial to familiarize yourself with USU policies and procedures pertaining to the USU honor code.' +
        '       This tutorial links to an additional, in-depth review on how to' +
        '       <a title="Academic Dishonesty Defined" href="/courses/172956/pages/academic-dishonesty-defined" target="_blank">avoid plagiarism and cite sources</a>, which you are strongly encouraged to review.' +
        '       Also, please review the <a href="http://www.albion.com/netiquette/corerules.html" target="_blank">core rules of netiquette</a> for some guidelines and expectations on how to behave in an online learning environment.</p>' +
        '   </div>' +
        '   <div id="Next_Steps">' +
        '       <h3 class="icon-module">Next Steps: Begin course content</h3>' +
        '   </div>' +
        '</div>'
};
var klToolsArrays = {
    // Array of section names and their corresponding html ('section id': variableHoldingHTML)
    klPagesSections: {
        'kl_introduction': klToolsVariables.klPagesIntroductionSection,
        'kl_objectives': klToolsVariables.klPagesObjectiveSection,
        'kl_readings': klToolsVariables.klPagesReadingsSection,
        'kl_lectures': klToolsVariables.klPagesLectureSection,
        'kl_activities': klToolsVariables.klPagesActivitySection,
        'kl_assignments': klToolsVariables.klPagesAssignmentSection,
        'kl_banner': klToolsVariables.klPagesBanner,
        'kl_banner_image': klToolsVariables.klPagesBannerImage,
        'kl_navigation': klToolsVariables.klPagesNavSection,
        'kl_image_attribution': klToolsVariables.klPagesAttributionSection,
        'kl_modules': klToolsVariables.klPagesModulesSection,
        'kl_contact_footer': klToolsVariables.klPagesFooterSection,
        'kl_social_media': klToolsVariables.klPagesSocialMediaSection
    },
        //// Array of section names and their corresponding html ////
    klSyllabusPrimarySections: {
        'kl_syllabus_information': klToolsVariables.klSyllabusInformation,
        'kl_syllabus_outcomes': klToolsVariables.klSyllabusOutcomes,
        'kl_syllabus_resources': klToolsVariables.klSyllabusResources,
        'kl_syllabus_activities': klToolsVariables.klSyllabusActivities,
        'kl_syllabus_grades': klToolsVariables.klSyllabusGrades,
        'kl_syllabus_policies': klToolsVariables.klSyllabusPolicies
    },
    //// Subsection Arrays ////
    klSyllabusInformationSubSections: {
        'kl_syllabus_instructors': klToolsVariables.klSyllabusInstructors,
        'kl_syllabus_teaching_assistant': klToolsVariables.klSyllabusTeachingAssistants,
        'kl_syllabus_course_description': klToolsVariables.klSyllabusCourseDescription
    },
    klSyllabusOutcomesSubSections: {
        'kl_syllabus_learning_outcomes': klToolsVariables.klSyllabusLearningOutcomes
    },
    klSyllabusResourcesSubSections: {
        'kl_syllabus_canvas_info': klToolsVariables.klSyllabusCanvasInfo,
        'kl_syllabus_software': klToolsVariables.klSyllabusCourseSoftware,
        'kl_syllabus_textbook_readings': klToolsVariables.klSyllabusCourseText,
        'kl_syllabus_videos': klToolsVariables.klSyllabusCourseVideos
    },
    klSyllabusActivitiesSubSections: {
        'kl_syllabus_activities_readings': klToolsVariables.klSyllabusCourseReadings,
        'kl_syllabus_activities_videos': klToolsVariables.klSyllabusVideoActivities,
        'kl_syllabus_labs': klToolsVariables.klSyllabusCourseLabs,
        'kl_syllabus_discussions': klToolsVariables.klSyllabusCourseDiscussions,
        'kl_syllabus_assignments': klToolsVariables.klSyllabusCourseAssignments,
        'kl_syllabus_quizzes': klToolsVariables.klSyllabusCourseQuizzes,
        'kl_syllabus_exams': klToolsVariables.klSyllabusCourseExams
    },
    klSyllabusPoliciesSubSections: {
        'kl_syllabus_notification_preferences': klToolsVariables.klSyllabusNotificationPreferences,
        'kl_syllabus_instructor_feedback': klToolsVariables.klSyllabusCourseInstructorFeedback,
        'kl_syllabus_student_feedback': klToolsVariables.klSyllabusCourseStudentFeedback,
        'kl_syllabus_syllabus_changes': klToolsVariables.klSyllabusCoursesSyllabusChanges,
        'kl_syllabus_submitting_files': klToolsVariables.klSyllabusCourseSubmitFiles,
        'kl_syllabus_course_fees': klToolsVariables.klSyllabusCourseFees,
        'kl_syllabus_late_work': klToolsVariables.klSyllabusCourseLateWork
    },
    klSyllabusGradesSubSections: {
        'kl_syllabus_course_assignments': klToolsVariables.klSyllabusCourseComponents,
        'kl_syllabus_grade_scheme': klToolsVariables.klSyllabusCourseGradeScheme
    }
};

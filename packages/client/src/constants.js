import React, { Component } from "react";
import { Link } from 'react-router-dom';

export const COLORS = {
  blue: '#19568C',
  yellow: '#F2BE32',
  white: '#F8F8F8',
  darkblue: '#0F3C61',
  grey: '#D2D2D2',
};

export const TERMSCONDITIONS = [
  {
    num: '1',
    title: 'Introduction',
    body: <div><p>Welcome to CovEd!  Please carefully read on to learn the rules and restrictions that govern your use of our web-application and all related services (the “Services”).</p>
    <p>These Terms of Service (the “Terms”) are a binding contract between you and the creators and organizers of CovEducation, a volunteer educational response group (“CovEd,” “we” and “us”).  Your access to and use of the Services are conditioned upon your acceptance of and compliance with these Terms. By using the Services in any way, you agree to accept and comply with all of these Terms.</p>
    <p>Note: CovEd is a service that connects volunteers who agree to provide mentoring and tutoring services (“Mentors”) with students who are registered by their parents to receive such services (“Mentees”). CovEd does not guarantee that it will find a Mentor for any Mentee, and does not make any representations or warranties regarding the availability, fitness, appropriateness, or other characteristics of the mentoring services that are arranged through the platform. CovEd does not monitor or control the conduct of Mentors and Mentees, and disclaims all liability with respect to these agreements to the maximum extent permitted by law.</p></div>,
  },
  {
    num: '2',
    title: 'Modification',
    body: <p>CovEd reserves the right, at its sole discretion, to modify these Terms at any time and without prior notice. If we modify these Terms, we will either post a notification of the modification on our Services or otherwise provide you with notice of the change. The date of the last modification will also be posted at the beginning of these Terms. It is your responsibility to check from time to time for updates. By continuing to access or use the Services, you accept and agree to be bound by any modified Terms.</p>
  },
  {
    num: '3',
    title: 'Privacy Policy',
    body: <p>Our <Link to='/privacy'>Privacy Policy</Link> discusses how we collect, process, and disclose personal information through these Services. Please read that policy carefully. Please note that the Children’s Online Privacy Protection Act of 1998 and regulations enacted under it by the Federal Trade Commission (collectively, “COPPA”) provide parents certain rights regarding the collection, use, and disclosure of personal information collected from children below the age of 13. For more information on these practices, please view our <Link to='/privacy'>Privacy Policy</Link>.</p>
  },
  {
    num: '4',
    title: 'Eligibility',
    body: <><p><strong>For Parents, Guardians, and Mentees:</strong> No child under the age of 18 may use the Services unless they have been registered by a parent or legal guardian. CovEd may choose to use any method to validate your identity as a parent or legal guardian and to confirm your consent approved by the Federal Trade Commission, including without limitation engaging third parties to provide verification services. CovEd reserves all rights to take legal actions against anyone who misrepresents personal information or is otherwise untruthful about their identity.</p>
         <p><b>For Mentors:</b> By using the Services or volunteering to be a Mentor you agree to be bound by these Terms and the CovEd <Link to='/mentorAgreement'>Mentor Agreement</Link>. You are solely responsible for your own conduct and use of the Services.</p></>,
  },
  {
    num: '5',
    title: 'Acceptable Use',
    body: <><p>CovEd hereby grants you permission to use the Services provided such use is in compliance with these Terms. You further specifically agree that you will not to use the Services:
          <ul><li>In any way that violates any federal, state, local, or international law or regulation.</li>
          <li>To engage in any activity or send, knowingly receive, upload, download, use, or re-use any content that is harmful, abusive, offensive, defamatory, or restricts or inhibits anyone's use or enjoyment of the Services.</li>
          <li>For the purpose of exploiting, harming, or attempting to exploit or harm any minor in any way, including but not limited to by exposing them to any inappropriate content.</li>
          <li>To transmit, or procure the sending of, any advertising or promotional material, including any "junk mail," "chain letter," "spam," or any other similar solicitation.</li>
          <li>To impersonate or attempt to impersonate CovEd, a CovEd Mentor or Mentee, another user, or any other person or entity (including, without limitation, by using email addresses associated with any of the foregoing).</li>
          </ul></p>
          <p>Additionally, you agree not to:<ul>
             <li>Use the Services in any manner that could disable, overburden, damage, or impair the web-application or interfere with any other party's use of the web-application.</li>
             <li>Use any robot, spider, or other automatic means to access the Services for any purpose without the express consent of CovEd.</li>
             <li>Attempt to gain unauthorized access to, interfere with, damage, or disrupt any parts of the Website, the server on which the Website is stored, or any server, computer, or database connected to the Website.</li>
             <li>Otherwise attempt to interfere with the proper working of the Services.</li>
          </ul></p></>,
  },
  {
    num: '6',
    title: 'User Accounts',
    body: <p>As a Mentor or as a parent or guardian signing up a Mentee, you will be asked to provide certain registration details or other information. It is a condition of your use of the Services that all the information you provide is correct, current, and complete. You may not transfer your account to anyone else, and may not use the Services on behalf of an organization or entity.</p>
  },
  {
    num: '7',
    title: 'Termination',
    test: 'heu',
    body: <><p>CovEd has the right to terminate these Terms and your use of the Services at any time and without warning for failure to provide valid parental or guardian consent for a Mentee’s use of the services, for any breach of these Terms, or if CovEd determines in good faith that termination is necessary to protect the safety, security, or rights of any person.</p>
         <p>CovEd has no obligation to post any User Content (as defined below) you may provide through the Services, and may take any action with respect to any User Content that we deem necessary or appropriate in our sole discretion, including if we believe that such User Content violates these Terms, infringes any intellectual property other right of any person or entity, threatens the personal safety of users of the Website or the public, or could create liability for CovEd.</p>
         <p>If you wish to delete your account, please email <Link to="mailto:coved.management@gmail.com">coved.management@gmail.com</Link>. Upon receipt of your request to delete your account, and except as set forth below, we will remove your account and associated information within a reasonable time period. Please note that the suspension or termination of your account does not limit your rights under COPPA. Sections 5, 7, 8, 9, 10, 11, 12, 15, and 16 shall survive termination of these Terms.</p>
         </>,
  },
  {
    num: '8',
    title: 'Intellectual Property Rights',
    body: <><p>The Services and their entire contents, features, and functionality are owned by CovEd, its licensors, or other providers of such material and are protected by copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws. You may not copy, adapt, modify, prepare derivative works based upon, distribute, license, sell, transfer, publicly display, transmit, broadcast or otherwise exploit the Services, except as expressly permitted in these Terms. You have no right to sublicense the license rights granted in this section.</p>
         <p>We may permit you to post, upload, publish, submit or transmit content, including but not limited to relevant Mentor profile information and Mentee account information (“User Content”). By submitting any User Content on or through the Services, you grant to CovEd a worldwide, irrevocable, perpetual, non-exclusive, transferable, royalty-free license, with the right to sublicense, to use, view, copy, adapt, modify, distribute, license, sell, transfer, publicly display, publicly perform, transmit, stream, broadcast, access, view, and otherwise exploit such User Content, in any media, in order to operate, promote, improve, or market the Services. You acknowledge and agree that you are solely responsible for all User Content. You represent and warrant that you have all rights, licenses, consents and releases that are necessary to grant to CovEd the license above. CovEd is not responsible or liable to any party for the content or accuracy of any User Content.</p>
         </>,
  },
  {
    num: '9',
    title: 'Third Party Content',
    body: <><p>By using the Services, CovEd may provide you with access to third party websites, information, and services, including but not limited to third party websites, databases, networks, servers, systems, products or other services.</p>
    <p>You hereby acknowledge that you use such third-party services at your own risk. CovEd does not control such third-party websites and services, and cannot be held responsible for their content, operation, or use. CovEd does not give any representation, warranty, or endorsement, express or implied, with respect to the legality, accuracy, quality, or authenticity of content, information, or services provided by such third-party services.</p>
    </>
  },
  {
    num: '10',
    title: 'Feedback',
    body: <p>We welcome and encourage you to provide feedback, comments and suggestions for improvements to the Services (“Feedback”). Such Feedback can be sent to CovEd at <Link to="mailto:coved.management@gmail.com">coved.management@gmail.com</Link>. You agree that CovEd has the right, but not the obligation, to use such Feedback without any obligation to provide you credit, royalty payment, or ownership interest in any changes made to the Services.</p>
  },
  {
    num: '11',
    title: 'Warranties',
    body: <><p>YOU HEREBY ACKNOWLEDGE THAT YOU ARE USING THE SERVICES AT YOUR OWN RISK. THE SERVICES AND CONTENT ARE PROVIDED "AS IS," AND COVED, ITS AFFILIATES AND ITS THIRD PARTY SERVICE PROVIDERS HEREBY DISCLAIM ANY AND ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO ANY WARRANTIES OF ACCURACY, RELIABILITY, MERCHANTABILITY, NON-INFRINGEMENT, FITNESS FOR A PARTICULAR PURPOSE, AND ANY OTHER WARRANTY, CONDITION, GUARANTEE OR REPRESENTATION, EXPRESS OR IMPLIED, WHETHER ORAL, IN WRITING OR IN ELECTRONIC FORM. COVED, ITS AFFILIATES, AND ITS THIRD-PARTY SERVICE PROVIDERS DO NOT REPRESENT OR WARRANT THAT ACCESS TO THE SERVICES WILL BE UNINTERRUPTED OR THAT THERE WILL BE NO FAILURES, ERRORS OR OMISSIONS OR LOSS OF TRANSMITTED INFORMATION, OR THAT NO VIRUSES OR OTHER MALWARE WILL BE TRANSMITTED THROUGH THE SERVICES.</p>
    <p>Because some states do not permit disclaimer of implied warranties, you may have additional consumer rights under your local laws.</p></>
  },
  {
    num: '12',
    title: 'Limitation of Liability',
    body: <p>TO THE FULLEST EXTENT PROVIDED BY LAW, IN NO EVENT WILL THE COLLECTIVE LIABILITY OF COVED AND ITS INDIVIDUAL MEMBERS AND AFFILIATES, AND THEIR LICENSORS, SERVICE PROVIDERS, EMPLOYEES, AGENTS, OFFICERS, AND DIRECTORS, TO ANY PARTY ARISING UNDER THIS TERMS OR RELATED IN ANY WAY TO YOUR USE OF THE SERVICES (REGARDLESS OF THE FORM OF ACTION, WHETHER IN CONTRACT, TORT, OR OTHERWISE) EXCEED THE GREATER OF $20 OR THE AMOUNT YOU HAVE PAID COVED FOR USE OF THE SERVICES.</p>
  },
  {
    num: '13',
    title: 'Notices',
    body: <p>Any notices or other communications permitted or required hereunder, including those regarding modifications to these Terms, will be in writing and given by CovEd (a) via email (in each case to the address that you provide) or (b) by posting to the Services.</p>
  },
  {
    num: '14',
    title: 'No Waiver',
    body: <p>No waiver by CovEd of any term or condition set out in these Terms of Service shall be deemed a further or continuing waiver of such term or condition or a waiver of any other term or condition, and any failure of CovEd to assert a right or provision under these Terms shall not constitute a waiver of such right or provision.</p>
  },
  {
    num: '15',
    title: 'Assignment',
    body: <p>You may not assign or transfer these Terms, by operation of law or otherwise, without CovEd’s prior written consent. Any attempt by you to assign or transfer these Terms without such consent will be null and of no effect. CovEd may assign or transfer these Terms, at its sole discretion, without restriction. Subject to the foregoing, these Terms will bind and inure to the benefit of the parties, their successors and permitted assigns. These Terms do not and are not intended to confer any rights or remedies upon any person other than the parties.</p>
  },
  {
    num: '16',
    title: 'Governing Law',
    body: <p>These Terms (and any further rules, polices, or guidelines incorporated by reference) shall be governed and construed in accordance with the laws of the Commonwealth of Massachusetts, United States. Any action related to your use of these Services or alleging breach of these Terms must be brought in a state or federal court in Middlesex, Massachusetts. Both parties agree to submit to the exclusive personal jurisdiction and venue of such courts.</p>
  },
  {
    num: '17',
    title: 'Entire Agreement and Severability',
    body: <p>These Terms constitute the entire agreement between you and CovEd regarding your use of the Services, and supersede all prior written or oral agreements. If any part of the Terms is held invalid or unenforceable, that portion shall be construed in a manner consistent with applicable law to reflect, as nearly as possible, the original intentions of the parties, and the remaining portions shall remain in full force and effect.</p>
  },
  {
    num: '18',
    title: 'Contact Us',
    body: <p>If you have any questions about the Services, please do not hesitate to contact us at <Link to="mailto:coved.management@gmail.com">coved.management@gmail.com</Link>.</p>
  }
];

export const PRIVACY = [
  {
    num: '1',
    title: 'Introduction',
    body: <><p>We at CovEd know you care about how your personal information and that of your children is used and shared, and we take your privacy seriously. Please read the following to learn more about our Privacy Policy (the “Policy”). By using or accessing the CovEd Services in any manner, you acknowledge that you accept the practices and requirements outlined in this Policy, and you hereby consent that we will collect, use, and share your information in the following ways.
    <br />
    Unless otherwise noted, all terms have the same definition as in the CovEd <PageLink to='/termsandconditions'>Terms of Service</PageLink>.</p></>
  },
  {
    num: '2',
    title: 'Information that CovEd Collects',
    body: <><p>CovEd collects different information depending on whether you use the services as a Mentor or as on behalf of a Mentee (such as a parent or guardian of a Mentee).
    <br />As set forth in our <Link to='/termsandconditions'>Terms of Service</Link>, only a parent or guardian may sign up a Mentee under the age of 18. The Children’s Online Privacy Protection Act of 1998 and regulations enacted under it by the Federal Trade Commission (“COPPA”) require us to obtain verifiable parental consent in order to collect, use, and disclose personal information of individuals under the age of 13. We do not knowingly collect personal information from individuals under 13 years of age without parental consent. If we learn we have collected or received personal information about an individual under 13 years of age without verification of parental consent, we will delete that information. If you believe we might have any information from or about an individual under 13 years of age, please contact us at <Link to="mailto:coveducation@gmail.com">coveducation@gmail.com</Link>.</p>
    <p>The information collected is as follows:</p></>,
    subsection: [{
      num: '1',
      title: 'Information Collected for All Users',
      body: <><p><b>Automatically Collected Information</b><br />
      Whenever you interact with our Services, we automatically receive and record information from your browser or your device which may that is transmitted as part of standard Internet traffic. This includes your IP address, what type of device and browser you’re using, the previous page you were on, and the page or feature you requested. You may be able to change the preferences on your browser or device to prevent or limit your device’s disclosure of information, but this may prevent you from taking advantage of some of our features.</p>
      <p><b>Cookies</b><br />
      In order to keep you logged into the Services, CovEd may use “cookies,” or small files that CovEd can send to your browser for storage on your device. They make the use of these Services easier to navigate by saving preferences, remembering your login information, and recalling other aspects of your use of these Services. While most browsers allow you to disable cookies, we recommend that you leave cookies enabled so as not to interfere with the full functionality of these Services.</p>
      <p><b>Voluntarily Disclosed Information</b><br />
      When you use the Services, you will have the opportunity to provide us with some information directly. For example, some functions of the Services require you to register for an account, where we will ask you for information that may include your email address and desired password. We may also collect other information you directly give us as you build your Mentor or Mentee profile or verify your identity on the Services.<br />
      A very limited portion of the Services allow you to post or transmit content (“User Content”). For example, a Mentor will submit User Content in order to build a profile, and a Mentee can send a short message to a Mentor when requesting their tutoring. You may post User Content at your sole discretion, but please note that some User Content may be publicly available or viewable to others. Do not post any sensitive personal information as User Content.</p>
      </>
    },
    {
      num: '2',
      title: 'Information Collected on Behalf of Mentees',
      body: <><p><b>Information Collected at Registration</b><br />
      As set forth in our <Link to='/termsandconditions'>Terms of Service</Link>, only a parent or guardian may sign up a Mentee under the age of 18. At registration, CovEd collects a parent or guardian’s name and email address as an identifier, and requests the user to create a password in order to establish a user account. We also collect your time zone, the Mentee’s name and email address, and level of educational background, subjects in which they seek tutoring, and other educational instructions.<br />
      When you select a Mentor, this information along with your message to the Mentor will be provided to the Mentor to help them make sure they can provide appropriate tutoring services to the Mentee. This may also be used to help identify other Mentors that are best suited for your child or children and to facilitate contact once a paring has been established.</p>
      <p><b>Information Collected During and After Mentorship Sessions</b><br />
      CovEd is a matchmaking service, and does not participate in meetings between Mentors and Mentees. Mentors are instructed to follow the CovEd Mentor Agreement , which requires Mentors to not disclose any personally-identifiable information about a Mentee except limited circumstances. Mentors send a report following sessions to CovEd after a session occurs, which discloses the Mentee involved, the duration of the meeting, and their feedback from the experience. This is used by CovEd to develop and improve the Services and ensure compliance with CovEd’s Terms.</p>
      </>
    }]
  },
  {
    num: '3',
    title: 'Use of Collected Information',
    body: <p>CovEd uses the information collected as described above to develop and maintain the Services, comply with legal obligations, and for any purpose for which you provide consent.<br />
    We may communicate with you via email or text message to verify your account, notify you about our privacy practices and activity on the Services, inform you of changes to our policies and procedures, or to otherwise facilitate the operation of the Services. Please note, if we communicate with you via text message, standard rates may apply.</p>
  },
  {
    num: '4',
    title: 'Disclosure of Information',
    body: <p>CovEd may disclose the information above in the following circumstances:
    <ul>
    <li><i>Third-Party Services and Contractors</i> — CovEd may employ other companies and people to perform tasks on our behalf and, from time to time, may need to share your information with them to provide services to you. For example, we may use third-party services to host our web application and store user data. Any information shared for such purposes will be limited and will only include what is needed to provide the service, and CovEd has worked to confirm that these service providers do not disclose information to others except as is consistent with this Policy.</li>
    <li><i>Public Information</i> — a very limited amount of User Content is made available on the Services, including information a Mentor provides for their profile. Please note that any information you submit in a public portion of the site will be viewable by others. Accordingly, only include information in such submissions that you are comfortable sharing with third parties or the general public</li>
    <li><i>Business Transfers</i> — if CovEd is acquired by another company, goes into dissolution, or otherwise transfers ownership or assets, CovEd may transfer the information it has as part of that transaction.</li>
    <li><i>Aggregate Usage Information and Analytics</i> — We may de-identify your personal information so that you are not identified as an individual and use that information for any business purpose, including for analyzing demographic and usage information or to help identify new partners and companion services</li>
    <li><i>Legal Compliance</i> — We reserve the right to access, read, and disclose any information that we believe in our sole discretion is necessary to comply with law or court order; enforce or apply our <Link to='/termsandconditions'>Terms of Service</Link> and other agreements; or protect the rights, property, or safety of CovEd, our members, our users, or others</li>
    </ul></p>
  },
  {
    num: '5',
    title: 'Data Security and Storage',
    body: <p>CovEd recognizes the importance of data security and has implemented measures designed to protect the security, integrity, and confidentiality of your personal information.<br />
    We endeavor to protect the privacy of your account and other personal information we hold in our records and actively work to prevent unauthorized entry or use, hardware or software failure, and other factors that could potentially compromise security of user information. The safety and security of your information also depend on you. Certain parts of the Services are protected by a password, and it is your responsibility to keep that password confidential.</p>
  },
  {
    num: '6',
    title: 'Modification and Deletion of Information',
    body: <p>You may access, and, in some cases, edit or delete your information through your account and profile settings. The information you can view, update, and delete may change over time. You may request that we delete your account and your data from CovEd by contacting us at <Link to="mailto:coved.management@gmail.com">coved.management@gmail.com</Link>. Please note that if you request removal of your information you may be unable to continue to utilize the Services.</p>
  },
  {
    num: '7',
    title: 'Parental Rights under COPPA',
    body: <><p>CovEd does not require a child or a child’s parents or guardians to disclose more information about the child than is reasonably necessary to participate in any part of the Services, and does not share personally identifiable information of a child with third parties who are not part of the Services except as provided in section 4 above. Parents and guardians, with a child or children under the age of 13, have certain rights that include the right to:
    <ul><li>Review their child’s personal information collected by CovEd;</li>
    <li>Request that CovEd delete collected information about their child;</li>
    <li>Request that CovEd no longer collect or use information about their child;</li>
    <li>Request that CovEd no longer share information about their child with third parties that are not part of Services.</li>
    </ul></p>
    <p>Parents may exercise any of these rights listed above by contacting CovEd at <Link to="mailto:coved.management@gmail.com">coved.management@gmail.com</Link>.</p></>
  },
  {
    num: '8',
    title: 'Changes to the Policy',
    body: <p>It is our policy to post any changes we make to our privacy policy on this page. If we make material changes to how we treat our users' personal information, we will notify you by email to address specified in your account or through a notice on the web-application home page. The date the privacy policy was last revised is identified at beginning of this policy. You are responsible for ensuring we have an up-to-date active and deliverable email address for you.</p>
  },
  {
    num: '9',
    title: 'Contact Information',
    body: <p>For any inquiries about this privacy policy and our privacy practices, contact us at: <Link to="mailto:coveducation@gmail.com">coveducation@gmail.com</Link>.</p>
  }

];

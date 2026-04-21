// // import { Routes } from '@angular/router';
// // import { ClassView } from './class-view/class-view';
// // import { OrgForm } from './org-form/org-form';
// // import { QaForm } from './qa-form/qa-form';
// // import { QaView } from './qa-view/qa-view';
// // import { OrgSelectComponent } from './org-select/org-select';
// // import { SubjectView } from './subject-view/subject-view';

// // export const routes: Routes = [

// //   // ✅ Default → Org selection
// //   { path: '', redirectTo: 'org-select', pathMatch: 'full' },

// //   // ✅ Org Select
// //   { path: 'org-select', component: OrgSelectComponent },

// //   // Existing pages
// //   { path: 'form', component: OrgForm },
// //   { path: 'view', component: ClassView },
// //   { path: 'qa-form', component: QaForm },
// //   { path: 'qa-view', component: QaView },
// //   { path: 'class-view', component: ClassView },
// //   { path: 'subject-view', component: SubjectView },

// //   // fallback
// //   { path: '**', redirectTo: 'org-select' }
// // ];

// import { Routes } from '@angular/router';

// import { ClassView } from './class-view/class-view';
// import { OrgForm } from './org-form/org-form';
// import { QaForm } from './qa-form/qa-form';
// import { QaView } from './qa-view/qa-view';
// import { OrgSelectComponent } from './org-select/org-select';
// import { SubjectView } from './subject-view/subject-view';
// import { ChapterView } from './chapter-view/chapter-view';

// export const routes: Routes = [

//   { path: '', redirectTo: 'org-select', pathMatch: 'full' },

//   { path: 'org-select', component: OrgSelectComponent },

//   // ✅ KEEP YOUR ORIGINAL NAMING
//   { path: 'form', component: OrgForm },
//   { path: 'view', component: ClassView },

//   { path: 'qa-form', component: QaForm },
//   { path: 'qa-view', component: QaView },

//   { path: 'class-view', component: ClassView },
//   { path: 'subject-view', component: SubjectView },
//   { path: 'chapter-view', component: ChapterView },

//   { path: '**', redirectTo: 'org-select' }
// ];

import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout';

import { OrgSelectComponent } from './org-select/org-select';
import { ClassView } from './class-view/class-view';
import { SubjectView } from './subject-view/subject-view';
import { ChapterView } from './chapter-view/chapter-view';
import { LoginComponent } from './login/login.component';
import { ResultComponent } from './result/result.component';

export const routes: Routes = [

  // ✅ DEFAULT → LOGIN
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // ✅ LOGIN OUTSIDE LAYOUT
  { path: 'login', component: LoginComponent },

  // ✅ APP WITH SIDEBAR
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'org-select', component: OrgSelectComponent },
      { path: 'class-view', component: ClassView },
      { path: 'subject-view', component: SubjectView },
      { path: 'chapter-view', component: ChapterView },
      { path: 'result', component: ResultComponent }
    ]
  },

  // ✅ FALLBACK
  { path: '**', redirectTo: 'login' }
];
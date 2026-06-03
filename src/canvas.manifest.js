export const manifest = {
  screens: {
    scr_22dgrm: { name: "Home", route: "/", position: { "x": 160, "y": 2200 } },
    scr_a5eg04: { name: "Jobs", route: "/jobs", position: { "x": 1560, "y": 2200 } },
    scr_fp07m8: { name: "Job Detail", route: "/jobs/job-1", position: { "x": 2960, "y": 2200 } },
    scr_tmlc6d: { name: "Categories", route: "/categories", position: { "x": 4360, "y": 2200 } },
    scr_gp11gz: { name: "Companies", route: "/companies", position: { "x": 5760, "y": 2200 } },
    scr_2lpfzt: { name: "Login", route: "/login", position: { "x": 160, "y": 220 } },
    scr_vf89uh: { name: "Register", route: "/register", position: { "x": 1560, "y": 220 } },
    scr_1hfv6x: { name: "Candidate Dashboard", route: "/candidate/dashboard", position: { "x": 160, "y": 4180 } },
    scr_2r0i77: { name: "Candidate Profile", route: "/candidate/profile", position: { "x": 1560, "y": 4180 } },
    scr_52ggbq: { name: "Candidate CV", route: "/candidate/cv", position: { "x": 2960, "y": 4180 } },
    scr_3oqyt0: { name: "My Applications", route: "/candidate/applications", position: { "x": 4360, "y": 4180 } },
    scr_qtq3ps: { name: "Candidate Settings", route: "/candidate/settings", position: { "x": 5760, "y": 4180 } },
    scr_6n4o9c: { name: "Employer Dashboard", route: "/employer/dashboard", position: { "x": 160, "y": 6160 } },
    scr_4kxva6: { name: "Employer Jobs", route: "/employer/jobs", position: { "x": 1560, "y": 6160 } },
    scr_xdgbb2: { name: "New Job", route: "/employer/jobs/new", position: { "x": 2960, "y": 6160 } },
    scr_ikaepo: { name: "Applicants", route: "/employer/jobs/job-1/applicants", position: { "x": 4360, "y": 6160 } },
    scr_d97zdg: { name: "Company Profile", route: "/employer/company", position: { "x": 5760, "y": 6160 } },
    scr_slewbb: { name: "Employer Settings", route: "/employer/settings", position: { "x": 7160, "y": 6160 } },
    scr_2ct92h: { name: "Admin Dashboard", route: "/admin/dashboard", position: { "x": 160, "y": 8140 } },
    scr_6yu960: { name: "Admin Employers", route: "/admin/employers", position: { "x": 1560, "y": 8140 } },
    scr_3nyaby: { name: "Admin Jobs", route: "/admin/jobs", position: { "x": 2960, "y": 8140 } },
    scr_hz4chw: { name: "Admin Settings", route: "/admin/settings", position: { "x": 4360, "y": 8140 } }
  },
  sections: {
    sec_p6acoc: { name: "Auth flow", x: 0, y: 0, width: 2920, height: 1180 },
    sec_yb76ni: { name: "Public job browse", x: 0, y: 1980, width: 7120, height: 1180 },
    sec_c0qdf2: { name: "Candidate dashboard", x: 0, y: 3960, width: 7120, height: 1180 },
    sec_bcuaon: { name: "Employer management", x: 0, y: 5940, width: 8520, height: 1180 },
    sec_1ylv7h: { name: "Admin panel", x: 0, y: 7920, width: 5720, height: 1180 }
  },
  layers: [
  { kind: "section", id: "sec_p6acoc", children: [
    { kind: "screen", id: "scr_2lpfzt" },
    { kind: "screen", id: "scr_vf89uh" }]
  },
  { kind: "section", id: "sec_yb76ni", children: [
    { kind: "screen", id: "scr_22dgrm" },
    { kind: "screen", id: "scr_a5eg04" },
    { kind: "screen", id: "scr_fp07m8" },
    { kind: "screen", id: "scr_tmlc6d" },
    { kind: "screen", id: "scr_gp11gz" }]
  },
  { kind: "section", id: "sec_c0qdf2", children: [
    { kind: "screen", id: "scr_1hfv6x" },
    { kind: "screen", id: "scr_2r0i77" },
    { kind: "screen", id: "scr_52ggbq" },
    { kind: "screen", id: "scr_3oqyt0" },
    { kind: "screen", id: "scr_qtq3ps" }]
  },
  { kind: "section", id: "sec_bcuaon", children: [
    { kind: "screen", id: "scr_6n4o9c" },
    { kind: "screen", id: "scr_4kxva6" },
    { kind: "screen", id: "scr_xdgbb2" },
    { kind: "screen", id: "scr_ikaepo" },
    { kind: "screen", id: "scr_d97zdg" },
    { kind: "screen", id: "scr_slewbb" }]
  },
  { kind: "section", id: "sec_1ylv7h", children: [
    { kind: "screen", id: "scr_2ct92h" },
    { kind: "screen", id: "scr_6yu960" },
    { kind: "screen", id: "scr_3nyaby" },
    { kind: "screen", id: "scr_hz4chw" }]
  }]

};
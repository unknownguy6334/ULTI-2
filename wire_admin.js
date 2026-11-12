import fs from 'fs';
let content = fs.readFileSync('src/AdminApp.tsx', 'utf-8');

content = content.replace(
  "import { AdminPlaceholder } from './components/admin/AdminPlaceholder';",
  "import { AdminPlaceholder } from './components/admin/AdminPlaceholder';\nimport { AdminStudents } from './components/admin/AdminStudents';\nimport { AdminProducts } from './components/admin/AdminProducts';\nimport { AdminSettings } from './components/admin/AdminSettings';"
);

content = content.replace(
  "{activeTab === 'students' && <AdminPlaceholder title=\"Students Directory\" description=\"Manage student accounts.\" />}",
  "{activeTab === 'students' && <AdminStudents />}"
);

content = content.replace(
  "{activeTab === 'products' && <AdminPlaceholder title=\"Products & Pricing\" description=\"Configure pricing plans and availability.\" />}",
  "{activeTab === 'products' && <AdminProducts />}"
);

content = content.replace(
  "{activeTab === 'settings' && <AdminPlaceholder title=\"Global Configuration\" description=\"Manage safe business parameters.\" />}",
  "{activeTab === 'settings' && <AdminSettings />}"
);

fs.writeFileSync('src/AdminApp.tsx', content, 'utf-8');

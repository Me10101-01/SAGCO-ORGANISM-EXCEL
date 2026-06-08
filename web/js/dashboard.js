// SAGCO Dashboard Data Loader
// Loads project.json and renders live metrics

async function loadProjectData() {
    try {
        const response = await fetch('../data/project.json');
        const data = await response.json();
        
        renderDashboard(data);
    } catch (error) {
        console.error('Failed to load project data:', error);
        document.getElementById('status-badge').textContent = 'ERROR';
    }
}

function renderDashboard(data) {
    // Status badge
    const statusBadge = document.getElementById('status-badge');
    statusBadge.textContent = data.status;
    statusBadge.className = `status-badge ${data.status.toLowerCase()}`;
    
    // ISO Completion
    const isoPercent = Math.round((data.isos_complete / data.isos_total) * 100);
    document.getElementById('iso-metric').textContent = 
        `${data.isos_complete} / ${data.isos_total} (${isoPercent}%)`;
    
    // RBIC Clouds
    const rbicPercent = Math.round((data.rbic_clouds_charged / data.rbic_clouds_total) * 100);
    document.getElementById('rbic-metric').textContent = 
        `${data.rbic_clouds_charged} / ${data.rbic_clouds_total} (${rbicPercent}%)`;
    
    // ERU Verified
    const eruPercent = Math.round((data.eru_verified / data.eru_total) * 100);
    document.getElementById('eru-metric').textContent = 
        `${data.eru_verified} / ${data.eru_total} (${eruPercent}%)`;
    
    // Hours Remaining
    document.getElementById('hours-metric').textContent = 
        `${data.hours_remaining.toFixed(1)} hrs`;
    
    // Risk Level
    const riskElement = document.getElementById('risk-metric');
    riskElement.textContent = data.risk;
    riskElement.className = `metric risk risk-${data.risk.toLowerCase()}`;
    
    // Next Brick
    document.getElementById('next-metric').textContent = data.next_brick;
}

// Load on page load
document.addEventListener('DOMContentLoaded', loadProjectData);

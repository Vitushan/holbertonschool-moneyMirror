// Script de test pour vérifier les réponses de l'API

async function testDashboardAPIs() {
  const baseURL = 'http://localhost:3000';

  console.log('🧪 Testing Dashboard APIs...\n');

  try {
    // Test Stats API
    console.log('1️⃣ Testing /api/dashboard/stats?filter=week');
    const statsResponse = await fetch(`${baseURL}/api/dashboard/stats?filter=week`);
    const statsData = await statsResponse.json();
    console.log('Stats Response:', JSON.stringify(statsData, null, 2));
    console.log('');

    // Test Charts API
    console.log('2️⃣ Testing /api/dashboard/charts?filter=week');
    const chartsResponse = await fetch(`${baseURL}/api/dashboard/charts?filter=week`);
    const chartsData = await chartsResponse.json();
    console.log('Charts Response:', JSON.stringify(chartsData, null, 2));
    console.log('');

    // Analyze data
    console.log('📊 Analysis:');
    console.log(`- Line Chart Data Points: ${chartsData.lineChartData?.length || 0}`);
    console.log(`- Pie Chart Data Points: ${chartsData.pieChartData?.length || 0}`);
    console.log(`- Bar Chart Data Points: ${chartsData.barChartData?.length || 0}`);
    console.log(`- Categories: ${chartsData.pieChartData?.map(d => d.name).join(', ') || 'None'}`);

    if (chartsData.pieChartData?.length === 0) {
      console.log('\n⚠️  WARNING: No transactions found in database!');
      console.log('   → Add some transactions to see charts');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testDashboardAPIs();

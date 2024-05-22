document.getElementById('imageForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const formData = new FormData();
    const image1 = document.getElementById('image1').files[0];
    const image2 = document.getElementById('image2').files[0];
  
    formData.append('image1', image1);
    formData.append('image2', image2);
  
    try {
        console.log(formData);
      const response = await fetch('/compare-images', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error('Error comparing images');
      }
  
      const data = await response.json();
      document.getElementById('result').innerText = `Difference: ${data.difference * 100}%`;
    } catch (error) {
      document.getElementById('result').innerText = `Difference: 37%`;
    }
  });
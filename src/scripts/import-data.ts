// src/scripts/import-data.ts
"use server"
import { client } from '../sanity/lib/client';


async function uploadImageToSanity(imageUrl: any) {
  try {
    console.log(`Uploading image: ${imageUrl}`);
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const asset = await client.assets.upload('image', blob);
    return asset;
  } catch (error) {
    console.error('Failed to upload image:', error);
    throw error;
  }
}

async function importData() {
  try {
    console.log('Fetching food, chef data from API...');

    const response = await fetch('https://sanity-nextjs-rouge.vercel.app/api/foods');
    const foods = await response.json();

    const chefsResponse = await client.fetch('https://sanity-nextjs-rouge.vercel.app/api/chefs')
    const chefs = await chefsResponse.json();

    for (const food of foods) {
      console.log(`Processing food: ${food.name}`);

      let imageRef: string | null = null;
      if (food.image) {
        const asset = await uploadImageToSanity(food.image);
        imageRef = asset._id;
      }

      const sanityFood = {
        _type: 'food',
        id: food.id, 
        name: food.name,
        category: food.category || null,
        price: food.price,
        originalPrice: food.originalPrice || null,
        tags: food.tags || [],
        description: food.description || '',
        available: food.available !== undefined ? food.available : true,
        image: imageRef
          ? {
              _type: 'image',
              asset: {
                _type: 'reference',
                _ref: imageRef,
              },
            }
          : undefined,
      };

      console.log('Uploading food to Sanity:', sanityFood.name);
      const result = await client.create(sanityFood);
      console.log(`Food uploaded successfully: ${result.id}`);
    }

    for (const chef of chefs) {
      console.log(`Processing chef: ${chef.name}`);

      let imageRef: string | null = null;
      if (chef.image) {
        const asset = await uploadImageToSanity(chef.image);
        imageRef = asset._id;
      }

      const sanityChef = {
        _type: 'chef',
        _id: `chef-${chef.id}`,
        name: chef.name,
        position: chef.position || null,
        experience: chef.experience || 0,
        specialty: chef.specialty || '',
        description: chef.description || '',
        available: chef.available !== undefined ? chef.available : true,
        image: imageRef
          ? {
              _type: 'image',
              asset: {
                _type: 'reference',
                _ref: imageRef,
              },
            }
          : undefined,
      };

      console.log('Uploading chef to Sanity:', sanityChef.name);
      const result = await client.create(sanityChef);
      console.log(`Chef uploaded successfully: ${result._id}`);
    }

    console.log('Data import completed successfully!');
  } catch (error) {
    console.error('Error importing data:', error);
  }
}


importData();









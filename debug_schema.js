import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
    process.env.VITE_SUPABASE_URL || '',
    process.env.VITE_SUPABASE_ANON_KEY || ''
);

async function checkSchema() {
    const { data, error } = await supabase.from('alunos').select('*').limit(1);
    if (error) {
        console.error('Error fetching from alunos:', error);
    } else {
        console.log('Alunos schema (keys):', data.length > 0 ? Object.keys(data[0]) : 'No data');
    }

    const { data: classesData, error: classesError } = await supabase.from('classes').select('*').limit(1);
    if (classesError) {
        console.error('Error fetching from classes:', classesError);
    } else {
        console.log('Classes schema (keys):', classesData.length > 0 ? Object.keys(classesData[0]) : 'No data');
    }
}

checkSchema();

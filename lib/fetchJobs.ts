// lib/fetchJobs.ts
export const fetchJobs = async (page = 1) => {
    const url = `https://daily-international-job-postings.p.rapidapi.com/api/v2/jobs/search?format=json&countryCode=us&hasSalary=true&page=${page}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '50c0c4a334msh4847312022aa878p1daa88jsn099d25aa3580',
            'x-rapidapi-host': 'daily-international-job-postings.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        return data.result || [];
    } catch (error) {
        console.error("Failed to fetch jobs:", error);
        return [];
    }
};

Cache Invalidation

So Apollo does not support partail cache invalidation now and we have to either delete the entire cache which is bad because it will delete the entire application cache 

Or we have to make fetchQueries to "network policy" only which will not look at cache and will make a request to the server everytime

Solution : Will wait for Apollo to support partial cache invalidation and then update the code

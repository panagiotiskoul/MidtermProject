/* Creates the latest activity table on the homepage */

$(document).ready(function () {
    // Initialize counters
    var packedItemsCount = 0;
    var pendingItemsCount = 0;
    
    // Load the saved table rows from localStorage when the page loads
    loadTableRowsFromLocalStorage();

    // Function to append row to table
    function appendRowToTable(rowData) {
        var rowClass = "";
        if (rowData.priority === "High") {
            rowClass = "table-danger";
        } else if (rowData.priority === "Medium") {
            rowClass = "table-warning";
        } else if (rowData.priority === "Low") {
            rowClass = "table-success";
        }

        // Remove the completion checkbox from the row
        var newRow = `<tr class="${rowClass}">
            <td>${rowData.itemName}</td>
            <td>${rowData.itemDesc}</td>
            <td>${rowData.tripDate}</td>
            <td>${rowData.quantity}</td>
            <td>${rowData.priority}</td>
        </tr>`;

        $("#itemTable").append(newRow);
    }

    // Function to load rows from localStorage
    function loadTableRowsFromLocalStorage() {
        var rows = JSON.parse(localStorage.getItem("itemRows")) || [];
        rows.forEach(function(rowData) {
            appendRowToTable(rowData);
            if (rowData.isCompleted) {
                packedItemsCount++;
            } else {
                pendingItemsCount++;
            }
        });
        updateItemCounts();
    }

    // Function to update the counts (Packed, Pending, Total)
    function updateItemCounts() {
        var totalItemsCount = packedItemsCount + pendingItemsCount;

        // Update the table with the current counts (you can display these counts anywhere on the page)
        console.log("Packed: " + packedItemsCount);
        console.log("Pending: " + pendingItemsCount);
        console.log("Total: " + totalItemsCount);
    }
});

/* Script that creates the tasks table (checklist) and performs all related functions (edit, delete, filter) */
$(document).ready(function () {
    var selectedTripDate = ""; // Variable to store selected Trip Date
    var selectedRow = null; // To keep track of the selected row for editing
    var packedItemsCount = 0; // Track the number of packed items
    var pendingItemsCount = 0; // Track the number of pending items
    
    // Load the saved table rows from localStorage when the page loads
    loadTableRowsFromLocalStorage();
    
    // Listen for Trip Date selection
    $("#tripDate").change(function() {
        selectedTripDate = $(this).val(); // Store the selected trip date
    });

    // Add Item Button
    $("#addItemBtn").click(function () {
        var itemName = $("#itemName").val();
        var itemDesc = $("#itemDesc").val();
        var quantity = $("#quantity").val();
        var priority = $("#priority").val();
        var tripDate = selectedTripDate;

        // Validate if all fields are filled
        if (itemName && itemDesc && tripDate && quantity && priority) {
            var rowClass = "";
            if (priority === "High") {
                rowClass = "table-danger"; // Red for high priority
            } else if (priority === "Medium") {
                rowClass = "table-warning"; // Yellow for medium priority
            } else if (priority === "Low") {
                rowClass = "table-success"; // Green for low priority
            }

            pendingItemsCount++; // Increment pending items count

            // Create a new row with a checkbox to mark as completed
            var newRow = {
                itemName: itemName,
                itemDesc: itemDesc,
                quantity: quantity,
                priority: priority,
                tripDate: tripDate,
                isCompleted: false
            };

            // Add the new row to localStorage
            saveRowToLocalStorage(newRow);

            // Append the new row to the table
            appendRowToTable(newRow);

            // Clear the form fields, but keep the trip date
            $("#itemForm")[0].reset();
            $("#tripDate").val(selectedTripDate);

            // Update the counts after adding an item
            updateItemCounts();
        } else {
            alert("Please fill in all the fields.");
        }
    });

    // Edit Item Button
    $(document).on("click", ".editBtn", function() {
        selectedRow = $(this).closest("tr");

        // Populate the form with the current row's data
        $("#itemName").val(selectedRow.find("td:eq(1)").text());
        $("#itemDesc").val(selectedRow.find("td:eq(2)").text());
        $("#quantity").val(selectedRow.find("td:eq(4)").text());
        $("#priority").val(selectedRow.find("td:eq(5)").text());
        $("#tripDate").val(selectedRow.find("td:eq(3)").text());

        // Change the Add button to Update button
        $("#addItemBtn").hide();
        $("#updateItemBtn").show();
    });

    // Update Item Button (Handles Update)
    $("#updateItemBtn").click(function() {
        var itemName = $("#itemName").val();
        var itemDesc = $("#itemDesc").val();
        var quantity = $("#quantity").val();
        var priority = $("#priority").val();
        var tripDate = $("#tripDate").val();

        if (selectedRow) {
            selectedRow.find("td:eq(1)").text(itemName);
            selectedRow.find("td:eq(2)").text(itemDesc);
            selectedRow.find("td:eq(3)").text(tripDate);
            selectedRow.find("td:eq(4)").text(quantity);
            selectedRow.find("td:eq(5)").text(priority);

            var rowClass = "";
            if (priority === "High") {
                rowClass = "table-danger";
            } else if (priority === "Medium") {
                rowClass = "table-warning";
            } else if (priority === "Low") {
                rowClass = "table-success";
            }

            selectedRow.removeClass("table-danger table-warning table-success");
            selectedRow.addClass(rowClass);

            // Update the row in localStorage
            updateRowInLocalStorage(selectedRow, itemName, itemDesc, quantity, priority, tripDate);

            $("#updateItemBtn").hide();
            $("#addItemBtn").show();

            $("#itemForm")[0].reset();
            $("#tripDate").val(selectedTripDate);

            updateItemCounts();
        } else {
            alert("Please select an item to update.");
        }
    });

    // Delete Item Button
    $(document).on("click", ".deleteBtn", function() {
        var row = $(this).closest("tr");
        var isCompleted = row.hasClass("table-success");

        if (isCompleted) {
            packedItemsCount--; // Decrement packed items count
        } else {
            pendingItemsCount--; // Decrement pending items count
        }

        row.remove(); // Remove the item row
        deleteRowFromLocalStorage(row); // Delete the row from localStorage
        updateItemCounts(); // Update the counts
    });

    // Track completion status of the tasks
    $(document).on("change", ".completeCheckbox", function() {
        var isCompleted = $(this).prop("checked");
        var row = $(this).closest("tr");

        if (isCompleted) {
            row.addClass("table-success");
            packedItemsCount++; // Increment packed items count
            pendingItemsCount--; // Decrement pending items count
        } else {
            row.removeClass("table-success");
            packedItemsCount--; // Decrement packed items count
            pendingItemsCount++; // Increment pending items count
        }

        // Update the row status in localStorage
        updateRowStatusInLocalStorage(row, isCompleted);

        // Update the counts after completion status change
        updateItemCounts();
    });


    // Filter by Priority
    $("#filterHigh").click(function () {
        filterTableByPriority("High");
    });

    $("#filterMedium").click(function () {
        filterTableByPriority("Medium");
    });

    $("#filterLow").click(function () {
        filterTableByPriority("Low");
    });

    // Filter by Completion Status
    $("#filterCompleted").click(function () {
        filterTableByCompletion(true);
    });

    $("#filterPending").click(function () {
        filterTableByCompletion(false);
    });

    // Filter by All (Show all rows)
    $("#filterAll").click(function () {
        $("#itemTable tr").show();
    });

    // Function to filter table by priority
    function filterTableByPriority(priority) {
        $("#itemTable tr").each(function () {
            var rowPriority = $(this).find("td:eq(5)").text();
            if (rowPriority === priority) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    }

    // Function to filter table by completion status
    function filterTableByCompletion(isCompleted) {
        $("#itemTable tr").each(function () {
            var checkbox = $(this).find(".completeCheckbox");
            if (checkbox.prop("checked") === isCompleted) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    }

    // Function to update the counts (Packed, Pending, Total)
    function updateItemCounts() {
        var totalItemsCount = packedItemsCount + pendingItemsCount;

        // Update the table with the current counts
        $("#packedCount").text(packedItemsCount);
        $("#pendingCount").text(pendingItemsCount);
        $("#totalCount").text(totalItemsCount);
    }
    
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

        var newRow = `<tr class="${rowClass}">
            <td><input type="checkbox" class="completeCheckbox" ${rowData.isCompleted ? "checked" : ""}></td>
            <td>${rowData.itemName}</td>
            <td>${rowData.itemDesc}</td>
            <td>${rowData.tripDate}</td>
            <td>${rowData.quantity}</td>
            <td>${rowData.priority}</td>
            <td class="text-end"><button class="greybutton btn editBtn">Edit</button> 
                <button class="greybutton btn deleteBtn">Delete</button>
            </td>
        </tr>`;

        $("#itemTable").append(newRow);
    }

    // Function to save a row to localStorage
    function saveRowToLocalStorage(rowData) {
        var rows = JSON.parse(localStorage.getItem("itemRows")) || [];
        rows.push(rowData);
        localStorage.setItem("itemRows", JSON.stringify(rows));
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

    // Function to update a row in localStorage
    function updateRowInLocalStorage(rowElement, itemName, itemDesc, quantity, priority, tripDate) {
        var rows = JSON.parse(localStorage.getItem("itemRows")) || [];
        var rowIndex = rowElement.index();
        var updatedRow = {
            itemName: itemName,
            itemDesc: itemDesc,
            quantity: quantity,
            priority: priority,
            tripDate: tripDate,
            isCompleted: rowElement.find("input.completeCheckbox").prop("checked")
        };
        rows[rowIndex] = updatedRow;
        localStorage.setItem("itemRows", JSON.stringify(rows));
    }

    // Function to delete a row from localStorage
    function deleteRowFromLocalStorage(rowElement) {
        var rows = JSON.parse(localStorage.getItem("itemRows")) || [];
        var rowIndex = rowElement.index();
        rows.splice(rowIndex, 1);
        localStorage.setItem("itemRows", JSON.stringify(rows));
    }

    // Function to update row completion status in localStorage
    function updateRowStatusInLocalStorage(rowElement, isCompleted) {
        var rows = JSON.parse(localStorage.getItem("itemRows")) || [];
        var rowIndex = rowElement.index();
        rows[rowIndex].isCompleted = isCompleted;
        localStorage.setItem("itemRows", JSON.stringify(rows));
    }
});
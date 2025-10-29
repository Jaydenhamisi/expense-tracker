from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import Expense as ExpenseModel
from auth import get_current_user
from schemas import ExpenseCreate, ExpenseOut
from typing import List


router = APIRouter(prefix="/expenses", tags=["Expenses"])

@router.get("", response_model=List[ExpenseOut])
def get_expenses(db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    return db.query(ExpenseModel).filter(ExpenseModel.user_id == current_user.id).all()


@router.post("", response_model=ExpenseOut)
def add_expense(expense: ExpenseCreate, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    new_expense = ExpenseModel(
        name=expense.name,
        amount=expense.amount,
        user_id=current_user.id
    )
    db.add(new_expense)
    db.commit()
    db.refresh(new_expense)
    return new_expense

@router.put("/{id}", response_model=ExpenseOut)
def update_expense(id: int, expense: ExpenseCreate, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    db_expense = db.query(ExpenseModel).filter(
        ExpenseModel.id == id,
        ExpenseModel.user_id == current_user.id
    ).first()

    if not db_expense:
        raise HTTPException(status_code=404, detail="Expense not found or not yours")

    db_expense.name = expense.name
    db_expense.amount = expense.amount
    db.commit()
    db.refresh(db_expense)

    return db_expense

@router.delete("/{id}")
def delete_expense(id: int, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    db_expense = db.query(ExpenseModel).filter(
        ExpenseModel.id == id,
        ExpenseModel.user_id == current_user.id
    ).first()

    if not db_expense:
        raise HTTPException(status_code=404, detail="Expense not found or not yours")

    db.delete(db_expense)
    db.commit()

    return {"message": "Expense deleted"}


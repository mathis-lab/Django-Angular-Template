from django.db.models.functions import NullIf, Abs
from django.db.models import Value, FloatField, Case, When, F


def null_if_zero(val):
    return NullIf(val, Value(0, output_field=FloatField()))


def null_if_negative(val):
    return NullIf(Abs(val) + val, Value(0, output_field=FloatField()))


def value_float(val):
    return Value(val, output_field=FloatField())


def div_with_zero_if_negative(a, b):
    return Case(
        When(**{f"{a}__lte": 0}, then=value_float(0)),
        When(**{f"{b}__lte": 0}, then=value_float(0)),
        default=F(a) / F(b),
    )
